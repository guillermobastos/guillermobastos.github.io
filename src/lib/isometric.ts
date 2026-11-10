export type Point3 = [number, number, number];

// Orthographic isometry: X/Y axes at ±30°, vertical Z. No WebGL runtime.
export function project(x: number, y: number, z = 0): [number, number] {
  return [430 + (x - y) * Math.sqrt(3) / 2, 135 + (x + y) / 2 - z];
}
export function points(vertices: Point3[]) {
  return vertices.map(vertex => project(...vertex).map(value => value.toFixed(2)).join(',')).join(' ');
}
export function line(vertices: Point3[]) {
  return vertices.map((vertex, index) => `${index ? 'L' : 'M'}${project(...vertex).map(value => value.toFixed(2)).join(' ')}`).join(' ');
}
