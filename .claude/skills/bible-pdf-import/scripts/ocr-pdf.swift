// OCR a scanned (image-only) PDF with macOS Vision, Romanian language.
// Usage: swift ocr-pdf.swift <pdf> <out-dir> [from-to] [--fast] [--png]
//   writes <out-dir>/page-NNN.txt (column-aware: left column first, then right)
//   --png  also writes <out-dir>/page-NNN.png (for proofreading)
//   --fast quick scan (used to map sections), prints first lines of each page
import AppKit
import Foundation
import PDFKit
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
  print("usage: swift ocr-pdf.swift <pdf> <out-dir> [from-to] [--fast] [--png]")
  exit(1)
}
let pdfPath = args[1]
let outDir = args[2]
let fast = args.contains("--fast")
let png = args.contains("--png")
guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else { print("cannot open \(pdfPath)"); exit(1) }
var from = 1, to = doc.pageCount
if args.count >= 4, !args[3].hasPrefix("--") {
  let parts = args[3].split(separator: "-").compactMap { Int($0) }
  from = parts[0]; to = parts.count > 1 ? parts[1] : parts[0]
}
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

struct Line { let text: String; let box: CGRect }

for pageNr in from...min(to, doc.pageCount) {
  guard let page = doc.page(at: pageNr - 1) else { continue }
  let bounds = page.bounds(for: .mediaBox)
  let scale: CGFloat = fast ? 1.5 : 3.0
  let size = CGSize(width: bounds.width * scale, height: bounds.height * scale)
  let img = page.thumbnail(of: size, for: .mediaBox)
  var rect = CGRect(origin: .zero, size: img.size)
  guard let cg = img.cgImage(forProposedRect: &rect, context: nil, hints: nil) else { continue }
  if png {
    let rep = NSBitmapImageRep(cgImage: cg)
    try? rep.representation(using: .png, properties: [:])?
      .write(to: URL(fileURLWithPath: String(format: "%@/page-%03d.png", outDir, pageNr)))
  }
  let req = VNRecognizeTextRequest()
  req.recognitionLanguages = ["ro-RO"]
  req.recognitionLevel = fast ? .fast : .accurate
  req.usesLanguageCorrection = true
  try? VNImageRequestHandler(cgImage: cg).perform([req])
  // Vision boxes: normalized, origin bottom-left
  var lines = (req.results ?? []).compactMap { o -> Line? in
    guard let s = o.topCandidates(1).first?.string else { return nil }
    return Line(text: s, box: o.boundingBox)
  }
  // drop page number (bottom center) and watermark ("carmel", "p", "d", "&", "c")
  lines = lines.filter { l in
    let t = l.text.trimmingCharacters(in: .whitespaces)
    if l.box.maxY < 0.08 && Int(t) != nil { return false }
    if ["carmel", "&", "p", "d", "c", "pd", "p d"].contains(t.lowercased()) { return false }
    return true
  }
  // column-aware ordering: a line belongs to left column if it starts before the middle
  // and does not span over most of the page (full-width lines keep reading order)
  let full = lines.filter { $0.box.width > 0.6 }
  let left = lines.filter { $0.box.width <= 0.6 && $0.box.midX < 0.5 }
  let right = lines.filter { $0.box.width <= 0.6 && $0.box.midX >= 0.5 }
  let byY: (Line, Line) -> Bool = { $0.box.maxY > $1.box.maxY }
  let ordered: [Line]
  if !full.isEmpty && (left.isEmpty || right.isEmpty) {
    ordered = lines.sorted(by: byY)
  } else {
    ordered = full.sorted(by: byY) + left.sorted(by: byY) + right.sorted(by: byY)
  }
  let text = ordered.map { $0.text }.joined(separator: "\n")
  if fast {
    print("\(pageNr) [\(ordered.count)]: " + ordered.prefix(3).map { $0.text }.joined(separator: " | "))
  }
  try? text.write(toFile: String(format: "%@/page-%03d.txt", outDir, pageNr), atomically: true, encoding: .utf8)
}
