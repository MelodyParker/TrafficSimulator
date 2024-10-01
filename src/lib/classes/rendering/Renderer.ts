import type World from "../representations/World";

export default class Renderer {
  ctx: CanvasRenderingContext2D;
  world: World;
  topLeft: number[];
  scale: number;

  constructor(ctx: CanvasRenderingContext2D, world: World, topLeft: number[], scale: number) {
    this.ctx = ctx;
    this.world = world;
    this.topLeft = topLeft;
    this.scale = scale;
  }

  worldPosToPixelPos(worldPos: number[]): number[] {
    return [this.scale * (worldPos[0] - this.topLeft[0]), this.scale * (worldPos[1] - this.topLeft[1])];
  }

  drawRoad(roadId: number): void {

    this.ctx.fillRect(0, 0, )
    let roadToDraw = this.world.getRoadById(roadId);
    if (typeof(roadToDraw) === "number") return;

    let topLeft = this.worldPosToPixelPos(roadToDraw.posFromDistance(0));
    let roadWidth = roadToDraw.getWidth();
    let roadLength = roadToDraw.getLength();

    let isHorizontal = roadToDraw.isHorizontal;

    this.ctx.fillStyle = "#f00";

    if (isHorizontal) {
      this.ctx.fillRect(topLeft[0], topLeft[1], roadLength, roadWidth);
    } else {
      this.ctx.fillRect(topLeft[0], topLeft[1], roadWidth, roadLength);
    }

  }

  

  render(): void {
    for (let road of this.world.getRoads()) {
      this.drawRoad(road.id);
    }
  }
}