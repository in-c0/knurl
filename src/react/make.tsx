"use client";
import {
  forwardRef, useCallback, useEffect, useLayoutEffect, useRef,
  type ComponentPropsWithoutRef, type CSSProperties, type ForwardRefExoticComponent, type RefAttributes,
} from "react";
import type { Control } from "../core/control";

/**
 * Knurl — the one React wrapper every control shares.
 *
 * A component renders one `<div>` and mounts its control in a layout effect,
 * so on the server the box is there (at its aspect ratio) and the drawing is
 * not. It mounts once; changed props reach the running control as `update`,
 * and callbacks are read through refs, so an inline function never remounts.
 * Pass `value`/`checked` to control it, or `defaultValue`/`defaultChecked`.
 */

export type KnurlDivProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "defaultValue" | "onChange">;
type Mount<O> = (el: HTMLElement, options?: O) => Control<O>;
type Callbacks = "onValueChange" | "onValueCommit" | "onCheckedChange" | "onPress" | "format";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function make<O extends object>(name: string, mount: Mount<O>, ratio: string, controlKey?: "value" | "checked") {
  type Props = O & KnurlDivProps;
  const C = forwardRef<HTMLDivElement, Props>(function Knurl(props, ref) {
    const all = props as Record<string, unknown>;
    const opts: Record<string, unknown> = {}, attrs: Record<string, unknown> = {};
    const known = new Set([
      "theme", "finish", "label", "disabled", "name", "value", "defaultValue", "min", "max", "step",
      "checked", "defaultChecked", "legend", "units", "options", "role", "peak", "spinning", "speed",
      "onValueChange", "onValueCommit", "onCheckedChange", "onPress", "format",
    ]);
    if (name !== "Gauge") known.delete("role"); // role is an option only of the gauge
    for (const k in all) (known.has(k) ? opts : attrs)[k] = all[k];

    const cbs = useRef<Record<string, unknown>>({});
    const fns: Callbacks[] = ["onValueChange", "onValueCommit", "onCheckedChange", "onPress", "format"];
    useIso(() => { for (const f of fns) cbs.current[f] = opts[f]; });
    const wrapped: Record<string, unknown> = {};
    for (const f of fns) if (opts[f]) wrapped[f] = f === "format" ? (v: number) => (cbs.current[f] as (v: number) => string)(v) : (...a: unknown[]) => (cbs.current[f] as (...a: unknown[]) => void)?.(...a);

    const el = useRef<HTMLDivElement | null>(null);
    const ctl = useRef<Control<O> | null>(null);
    const setRef = useCallback((node: HTMLDivElement | null) => {
      el.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, [ref]);

    const controlled = controlKey ? opts[controlKey] !== undefined : false;
    const data = { ...opts, ...wrapped, controlled } as O;

    useIso(() => {
      const c = mount(el.current!, data);
      ctl.current = c;
      return () => { c.destroy(); ctl.current = null; };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const key = JSON.stringify(opts, (k, v) => (typeof v === "function" ? (fns as string[]).includes(k) ? "ƒ" : undefined : v));
    useIso(() => { ctl.current?.update(data); }, [key]);

    const style = attrs.style as CSSProperties | undefined;
    return <div {...(attrs as KnurlDivProps)} ref={setRef} style={{ aspectRatio: ratio, ...style }} />;
  });
  C.displayName = name;
  return C as unknown as ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>>;
}

