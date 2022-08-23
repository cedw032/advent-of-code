import fs from "fs";

type CommandName = "down" | "up" | "forward";
type Position = { x: number; y: number };

const { x, y } = fs
  .readFileSync("./day-02.input")
  .toString()
  .split("\n")
  .map((tupleString) => tupleString.split(" ") as [CommandName, string])
  .map(([command, numberString]) => [command, +numberString] as const)
  .reduce(updatePosition, { x: 0, y: 0 });

console.log(x * y);

function updatePosition(
  position: Position,
  [commandName, value]: readonly [CommandName, number]
): Position {
  const commands = {
    up: ({ x, y }: Position, value: number) => ({ x, y: y - value }),
    down: ({ x, y }: Position, value: number) => ({ x, y: y + value }),
    forward: ({ x, y }: Position, value: number) => ({ x: x + value, y }),
  } as const;
  return commands[commandName](position, value);
}

type ShipState = { x: number; y: number; theta: number };

const shipState = fs
  .readFileSync("./day-02.input")
  .toString()
  .split("\n")
  .map((tupleString) => tupleString.split(" ") as [CommandName, string])
  .map(([command, numberString]) => [command, +numberString] as const)
  .reduce(updatePositionWithAim, { x: 0, y: 0, theta: 0 });

console.log(shipState.x * shipState.y);  

function updatePositionWithAim(
  position: ShipState,
  [commandName, value]: readonly [CommandName, number]
): ShipState {
  const commands = {
    up: ({ x, y, theta }: ShipState, value: number) => ({
      x,
      y,
      theta: theta - value,
    }),
    down: ({ x, y, theta }: ShipState, value: number) => ({
      x,
      y,
      theta: theta + value,
    }),
    forward: ({ x, y, theta }: ShipState, value: number) => ({
      x: x + value,
      y: y + theta * value,
      theta,
    }),
  } as const;
  return commands[commandName](position, value);
}
