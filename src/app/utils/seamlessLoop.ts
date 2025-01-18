interface LoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: boolean | number;
  paddingRight?: number;
  reversed?: boolean;
}

interface TimelineWithLoop extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
}

function horizontalLoop(
  items: (string | Element)[],
  config?: LoopConfig
): TimelineWithLoop {
  items = gsap.utils.toArray(items);
  config = config || {};

  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () =>{ tl.totalTime(tl.rawTime() + tl.duration() * 100)},
  }) as TimelineWithLoop;

  const length = items.length;
  const startX = (items[0] as HTMLDivElement).offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;

  // Handle snap configuration
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);

  // Set initial xPercents and populate width arrays
  gsap.set(items, {
    xPercent: (i: number, el: Element) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          parseFloat(gsap.getProperty(el, "xPercent"))
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const totalWidth =
    (items[length - 1] as Element).offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    (items[length - 1] as Element).offsetWidth *
      parseFloat(gsap.getProperty(items[length - 1], "scaleX")) +
    (parseFloat(config.paddingRight as string) || 0);

  // Create the loop animation
  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = (item as Element).offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart +
      widths[i] * parseFloat(gsap.getProperty(item, "scaleX"));

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length);

    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }

    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  // Add custom methods to the timeline
  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
  tl.times = times;

  // Pre-render for performance
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}

export default horizontalLoop;
