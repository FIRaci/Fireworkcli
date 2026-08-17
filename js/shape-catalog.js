/**
 * Parametric Shape Catalog Aggregator
 */

import { ShapeCatalogBasic } from './shape-catalog-basic.js';
import { ShapeCatalogExotic } from './shape-catalog-exotic.js';

export class ShapeCatalog {
  static generateSphere(c, s) { return ShapeCatalogBasic.generateSphere(c, s); }
  static generateHeart(c, s) { return ShapeCatalogBasic.generateHeart(c, s); }
  static generateStar5(c, s) { return ShapeCatalogBasic.generateStar5(c, s); }
  static generateStar8(c, s) { return ShapeCatalogBasic.generateStar8(c, s); }
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
}
