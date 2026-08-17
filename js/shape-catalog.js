/**
 * Master Shape Catalog Aggregator (<90 lines)
 * 35+ Shapes: Basic, Exotic, Geometry, Botanics/Flowers, Emblems, PNG Image, Doodle
 */

import { ShapeCatalogBasic } from './shape-catalog-basic.js';
import { ShapeCatalogExotic } from './shape-catalog-exotic.js';
import { ShapeCatalogGeometry } from './shape-catalog-geometry.js';
import { ShapeCatalogFlowers } from './shape-catalog-flowers.js';
import { ShapeCatalogEmblems } from './shape-catalog-emblems.js';

export class ShapeCatalog {
  // Basic & Exotic
  static generateSphere(c, s) { return ShapeCatalogBasic.generateSphere(c, s); }
  static generateHeart(c, s) { return ShapeCatalogBasic.generateHeart(c, s); }
  static generateStar5(c, s) { return ShapeCatalogGeometry.generateStar(5, c, s); }
  static generateStar6(c, s) { return ShapeCatalogGeometry.generateStar(6, c, s); }
  static generateStar8(c, s) { return ShapeCatalogGeometry.generateStar(8, c, s); }
  static generateStar12(c, s) { return ShapeCatalogGeometry.generateStar(12, c, s); }
  static generateWillow(c, s) { return ShapeCatalogBasic.generateWillow(c, s); }
  static generateSpiral(c, s) { return ShapeCatalogBasic.generateSpiral(c, s); }
  static generateDoubleRing(c, s) { return ShapeCatalogBasic.generateDoubleRing(c, s); }
  static generateDiamond(c, s) { return ShapeCatalogBasic.generateDiamond(c, s); }
  static generateSaturn(c, s) { return ShapeCatalogExotic.generateSaturn(c, s); }
  static generateButterfly(c, s) { return ShapeCatalogExotic.generateButterfly(c, s); }
  static generateClover(c, s) { return ShapeCatalogExotic.generateClover(c, s); }
  static generateInfinity(c, s) { return ShapeCatalogExotic.generateInfinity(c, s); }
  static generateCrown(c, s) { return ShapeCatalogExotic.generateCrown(c, s); }
  static generateSmiley(c, s) { return ShapeCatalogExotic.generateSmiley(c, s); }
  static generateChrysanthemum(c, s) { return ShapeCatalogExotic.generateChrysanthemum(c, s); }

  // Geometry
  static generateSquare(c, s) { return ShapeCatalogGeometry.generateSquare(c, s); }
  static generateCircle(c, s) { return ShapeCatalogGeometry.generateCircle(c, s); }
  static generateTriangle(c, s) { return ShapeCatalogGeometry.generateTriangle(c, s); }
  static generateHexagon(c, s) { return ShapeCatalogGeometry.generatePolygon(6, c, s); }
  static generateOctagon(c, s) { return ShapeCatalogGeometry.generatePolygon(8, c, s); }

  // Flowers
  static generateRose(c, s) { return ShapeCatalogFlowers.generateRose(c, s); }
  static generateLotus(c, s) { return ShapeCatalogFlowers.generateLotus(c, s); }
  static generateSunflower(c, s) { return ShapeCatalogFlowers.generateSunflower(c, s); }
  static generateSakura(c, s) { return ShapeCatalogFlowers.generateSakura(c, s); }
  static generateTulip(c, s) { return ShapeCatalogFlowers.generateTulip(c, s); }
  static generateDandelion(c, s) { return ShapeCatalogFlowers.generateDandelion(c, s); }

  // Emblems
  static generateMoon(c, s) { return ShapeCatalogEmblems.generateMoon(c, s); }
  static generateSun(c, s) { return ShapeCatalogEmblems.generateSun(c, s); }
  static generateMusicNote(c, s) { return ShapeCatalogEmblems.generateMusicNote(c, s); }
  static generateSnowflake(c, s) { return ShapeCatalogEmblems.generateSnowflake(c, s); }
  static generateTree(c, s) { return ShapeCatalogEmblems.generateTree(c, s); }
}
