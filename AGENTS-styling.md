# UI Layout Discipline (Strict Outer-Boundary CSS)

When creating or refactoring React UI code, follow these rules strictly.

## Goal

Keep JSX focused on structure and composition.
All layout and spacing should live in CSS Modules.
Use as few classNames as possible.

This is an outer-boundary styling approach:
prefer one class on the outermost meaningful boundary, then use hierarchical CSS for everything inside.

## Core principles

- JSX expresses structure, not layout.
- CSS Modules own layout, spacing, flow, and responsiveness.
- Prefer one outer boundary class whenever possible.
- Prefer hierarchical CSS over adding more classNames.
- Preserve meaningful UI library components such as Mantine `Center`, `Card`, `Paper`, `Button`, etc.

## ClassName rules (VERY IMPORTANT)

Default rule:
- Put a className on the outermost meaningful layout boundary only.

Preferred:
- `<Center className={classes.page}> ... </Center>`

Inside that boundary:
- Do NOT add classNames to nested `Card`, `Stack`, `Group`, `div`, `section`, `header`, `form`, etc. by default.
- Style them through hierarchical selectors from the outer boundary.

Only add another className if truly necessary:
- multiple similar sibling containers need different treatment
- the selector would otherwise become unclear or too broad
- there is a real semantic/layout distinction worth marking

If hierarchical CSS can reasonably target it, do NOT add another className.

## Styling approach

- Use CSS Modules
- Use CSS Grid / Flexbox in CSS, not JSX
- Prefer selectors like:

  - `.page > *`
  - `.page > * > header`
  - `.page > * > header > div`
  - `.page section`
  - `.page section > *`

- Shallow positional selectors are acceptable when stable:
  - `> *`
  - `:first-child`
  - `:not(...)`

Do NOT:
- target Mantine-generated classes
- target Mantine internal DOM structure
- use deep brittle selectors
- use `nth-child` unless there is no cleaner option

## Mantine usage rules

- KEEP Mantine components when they represent meaningful UI or layout intent:
  - `Center`, `Card`, `Paper`, `Button`, `TextInput`, etc.

- DO NOT replace meaningful Mantine components with plain `div`s unless necessary.

- DO NOT use Mantine layout/style props for page layout:
  - no `mt`, `mb`, `mx`, `my`, `m`
  - no `pt`, `pb`, `px`, `py`, `p`
  - no `w`, `h`, `mih`, `maw`
  - no `sx` for ordinary layout work

Mantine is for components and semantics, not for page-layout orchestration.

## Forbidden patterns

Do NOT produce:
- inline `style={{}}`
- `sx` for layout
- className on every nested node
- wrapper `div`s just to attach className
- replacing Mantine components with `div`
- CSS module class soup
- layout defined inline in JSX props

## Refactoring rules

When refactoring:

1. Keep meaningful Mantine components
2. Remove inline layout/style props
3. Keep or add one className on the outermost meaningful boundary
4. Move layout into CSS Module
5. Use hierarchical selectors from that boundary
6. Only introduce extra classNames if absolutely necessary
7. If too many classNames appear, simplify again

## Preferred JSX shape

Good:

```tsx
<Center className={classes.page}>
  <Card variant="shell">
    <header>
      <div>
        ...
      </div>
    </header>

    <Card withBorder radius="xl">
      <section>
        <Card>
          <div>
            ...
          </div>
        </Card>
      </section>
    </Card>
  </Card>
</Center>
```

Bad:
```tsx
<Center className={classes.page}>
  <Card className={classes.pageCard}>
    <Stack className={classes.content}>
      <header className={classes.header}>
        <Stack className={classes.headerText}>
```