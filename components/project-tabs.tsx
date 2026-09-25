"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

// Compound component: ProjectTabs owns the active tab in a Context and its parts read it, so no
// part needs isActive/onSelect props. Follows the WAI-ARIA tabs pattern with automatic activation.

type TabsContextValue = {
  active: string;
  setActive: (value: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(part: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`ProjectTabs.${part} must be rendered inside <ProjectTabs>`);
  return context;
}

const tabId = (baseId: string, value: string) => `${baseId}-tab-${value}`;
const panelId = (baseId: string, value: string) => `${baseId}-panel-${value}`;

function ProjectTabsRoot({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(defaultValue);
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function List({
  label,
  size = "base",
  children,
}: {
  label: string;
  size?: "base" | "sm";
  children: ReactNode;
}) {
  const { setActive } = useTabsContext("List");

  // Arrow keys, Home and End move focus between tabs and activate the focused one.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(':scope > [role="tab"]'),
    );
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    const nextIndex = {
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (nextIndex === undefined) return;

    event.preventDefault();
    const next = tabs[nextIndex];
    next.focus();
    setActive(next.dataset.value!);
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={`flex gap-x-5 border-b border-slate sm:gap-x-8 ${size === "sm" ? "text-sm" : "text-sm sm:text-base"}`}
    >
      {children}
    </div>
  );
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabsContext("Tab");
  const selected = active === value;

  return (
    <button
      type="button"
      role="tab"
      id={tabId(baseId, value)}
      aria-selected={selected}
      aria-controls={panelId(baseId, value)}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      onClick={() => setActive(value)}
      className={`-mb-px border-b py-2 ${
        selected ? "border-ink text-ink" : "border-transparent text-slate hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Panels({ children }: { children: ReactNode }) {
  return <div className="mt-8">{children}</div>;
}

// Inactive panels stay in the DOM with `hidden`, so every tab's content is in the server HTML.
function Panel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabsContext("Panel");

  return (
    <div
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      hidden={active !== value}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export const ProjectTabs = Object.assign(ProjectTabsRoot, { List, Tab, Panels, Panel });
