# Mac Dock Micro-Interaction

This spec provides a comprehensive blueprint for translating the sophisticated CSS Mac Dock micro-interaction into Figma, with detailed motion specifications, component structure, and implementation guidance for designers and developers.

# Design-to-Dev Spec: Mac Dock Micro-Interaction

## 1. Interaction Summary (TL;DR)

A Mac-style dock with 8 icon items that features:
- **Primary hover**: Item scales up (1.5x), lifts (-1.4rem), rotates (6° X-axis), and gets enhanced shadows
- **Neighboring cascade**: Adjacent items scale progressively with staggered delays (3ms, 6ms, 9ms, 12ms)
- **Label reveal**: Tooltip appears with scale and rotation animation
- **Inner glow**: Radial gradient overlay appears on hover
- **Smooth transitions**: 400ms duration with custom cubic-bezier easing

## 2. Triggers & States

| Origin | Trigger | Destination | Notes |
|--------|---------|-------------|-------|
| Idle | Hover In | Hovered | Primary item scales 1.5x, lifts -1.4rem |
| Idle | Hover In | Neighbor 1 | Scales 1.15x, lifts -0.7rem, 3ms delay |
| Idle | Hover In | Neighbor 2 | Scales 1.08x, lifts -0.4rem, 6ms delay |
| Idle | Hover In | Neighbor 3 | Scales 1.04x, lifts -0.2rem, 9ms delay |
| Idle | Hover In | Neighbor 4 | Scales 1.02x, lifts -0.1rem, 12ms delay |
| Hovered | Hover Out | Idle | Restores to original state |
| Hovered | Active | Pressed | Scales 1.18x, lifts -0.9rem, faster timing |

## 3. Motion Spec

| Property | From → To | Duration | Delay | Easing | Notes |
|----------|-----------|----------|-------|---------|-------|
| Transform (Primary) | scale(1) → scale(1.5) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Hover in |
| Transform (Primary) | translateY(0) → translateY(-1.4rem) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Hover in |
| Transform (Primary) | rotateX(0°) → rotateX(6°) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Hover in |
| Transform (Neighbor 1) | scale(1) → scale(1.15) | 400ms | 3ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Transform (Neighbor 2) | scale(1) → scale(1.08) | 350ms | 6ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Transform (Neighbor 3) | scale(1) → scale(1.04) | 300ms | 9ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Transform (Neighbor 4) | scale(1) → scale(1.02) | 250ms | 12ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Opacity (Label) | 0 → 1 | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label reveal |
| Transform (Label) | scale(0.7) → scale(1) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label scale |
| Transform (Label) | translateY(1.5rem) → translateY(0) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label lift |
| Transform (Label) | rotateX(-15°) → rotateX(0°) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label rotation |
| Opacity (Inner Glow) | 0 → 1 | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Glow reveal |
| Box Shadow | Default → Enhanced | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Shadow depth |
| Filter (Brightness) | 1 → 1.15 | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Visual enhancement |

## 4. Component Structure

### Layer Hierarchy
```
Dock Container
├── Dock Background
│   ├── Dock Reflection (::before)
│   └── Dock Border
├── Dock Item 1 (Mail)
│   ├── Icon Container
│   ├── Inner Glow (::before)
│   └── Label (::after)
├── Dock Item 2 (Files)
│   ├── Icon Container
│   ├── Inner Glow (::before)
│   └── Label (::after)
└── [Additional items...]
```

### Naming Convention
- **Components**: `Dock Item` (with variants)
- **Layers**: `Icon`, `Inner Glow`, `Label`
- **States**: `Idle`, `Hovered`, `Neighbor 1`, `Neighbor 2`, `Neighbor 3`, `Neighbor 4`, `Pressed`

### Variants & Props
- **Component**: `Dock Item`
- **Variants**: 
  - `State: Idle | Hovered | Neighbor 1 | Neighbor 2 | Neighbor 3 | Neighbor 4 | Pressed`
  - `Icon: Mail | Files | Photos | Music | TV | Browser | Games | Settings`
  - `Color: Blue | Pink | Cyan | Green | Orange | Teal | Rose | Peach`

## 5. Figma Interactions

### Smart Animate Usage
- **Primary hover**: Use Smart Animate with "Prefer matching layers"
- **Neighboring cascade**: Use Smart Animate with staggered delays
- **Label reveal**: Use Smart Animate for scale + opacity + transform

### Interaction Presets
- **On Hover**: Primary item transformation
- **While Hovering**: Neighboring item cascade
- **On Tap**: Active state (pressed)
- **After Delay**: Staggered neighbor animations

### Animation Options
- **Duration**: 400ms (primary), 250-400ms (staggered)
- **Easing**: Custom cubic-bezier(0.34,1.56,0.64,1)
- **Stagger**: 3ms increments for neighboring items

## 6. Tokens (Design System)

| Token | Usage | Base Value | Notes |
|-------|--------|------------|-------|
| `--duration-primary` | Standard animations | 400ms | ± 50ms tolerance |
| `--duration-stagger-1` | First neighbor | 400ms | 3ms delay |
| `--duration-stagger-2` | Second neighbor | 350ms | 6ms delay |
| `--duration-stagger-3` | Third neighbor | 300ms | 9ms delay |
| `--duration-stagger-4` | Fourth neighbor | 250ms | 12ms delay |
| `--ease-bounce` | Primary easing | cubic-bezier(0.34,1.56,0.64,1) | Map to Figma Custom |
| `--scale-hover` | Hover scale | 1.5 | ± 0.1 tolerance |
| `--scale-neighbor-1` | First neighbor scale | 1.15 | ± 0.05 tolerance |
| `--scale-neighbor-2` | Second neighbor scale | 1.08 | ± 0.05 tolerance |
| `--scale-neighbor-3` | Third neighbor scale | 1.04 | ± 0.05 tolerance |
| `--scale-neighbor-4` | Fourth neighbor scale | 1.02 | ± 0.05 tolerance |
| `--lift-hover` | Hover lift | -1.4rem | ± 0.1rem tolerance |
| `--rotation-hover` | Hover rotation | 6deg | ± 1deg tolerance |
| `--blur-backdrop` | Dock backdrop | 20px | ± 2px tolerance |
| `--radius-dock` | Dock corners | 2rem | ± 0.1rem tolerance |
| `--radius-item` | Item corners | 1rem | ± 0.05rem tolerance |

## 7. Accessibility (A11y)

### Focus States
- **Focus visible**: 2px white outline with 3px offset
- **Focus transform**: Subtle lift (-0.2rem) and scale (1.02x)

### Reduced Motion
- **Variant**: `reduced-motion` with simplified timing
- **Duration**: 200ms ease-out (vs 400ms)
- **Scale**: Reduced to 1.1x (vs 1.5x)
- **Neighbors**: Minimal scaling (1.05x)

### Contrast & Hit Areas
- **Hit area**: 4rem × 4rem (64px × 64px) - meets WCAG guidelines
- **Label contrast**: Black background (rgba(0,0,0,0.85)) on white text
- **Focus indicator**: High contrast white outline

## 8. Platform Notes

### Web Implementation
- **CSS Transitions**: Primary animation method
- **Transform3D**: Hardware acceleration enabled
- **Will-change**: Optimized for performance
- **Backface-visibility**: Prevents flickering

### Figma vs Runtime
- **Easing curves**: Exact cubic-bezier values may need approximation
- **Stagger delays**: Figma supports delays but may need manual setup
- **3D transforms**: Figma supports rotateX but may render differently
- **Backdrop filters**: Figma supports blur effects

### Responsive Considerations
- **Mobile**: Reduced scales (1.2x vs 1.5x) and lifts (-0.8rem vs -1.4rem)
- **Touch**: Active states optimized for touch interaction
- **Breakpoint**: 768px for mobile adjustments

## 9. QA Checklist

### Edge Cases
- [ ] Hover out during animation (should complete gracefully)
- [ ] Rapid hover in/out (should handle interrupts)
- [ ] Multiple simultaneous hovers (should prioritize first)
- [ ] Touch device behavior (should work without hover)

### Tolerances
- [ ] Scale accuracy: ±0.1 for primary, ±0.05 for neighbors
- [ ] Timing accuracy: ±50ms for primary, ±25ms for staggered
- [ ] Position accuracy: ±0.1rem for lifts
- [ ] Rotation accuracy: ±1deg for X-axis rotations

### Hover-out Behavior
- [ ] Animation reverses smoothly
- [ ] All items return to idle state
- [ ] No layout shifts during transition
- [ ] Performance remains smooth

### Interrupt Handling
- [ ] New hover cancels previous animation
- [ ] Smooth transition between different hover targets
- [ ] No animation conflicts or glitches

## 10. Handoff Pack

### Exports
- **Frames**: 
  - `Dock - Idle State`
  - `Dock - Hovered State`
  - `Dock - Neighbor Cascade`
  - `Dock - Active State`
  - `Dock - Mobile Variant`

### Videos
- **Primary hover**: 400ms hover in/out cycle
- **Neighbor cascade**: Full staggered animation sequence
- **Label reveal**: Tooltip animation demonstration
- **Mobile behavior**: Touch interaction showcase

### Naming Conventions
- **Components**: `Dock Item / State=Hovered / Icon=Mail`
- **Layers**: `Icon`, `Inner Glow`, `Label`, `Background`
- **Frames**: `Dock - [State] - [Icon]`
- **Variants**: `State: [Idle|Hovered|Neighbor 1-4|Pressed]`

---

## Code → Figma Mapping Table

| Code | Value | Figma Equivalent | Where to Configure | Notes |
|-------|-------|------------------|-------------------|-------|
| `transition: all 0.4s` | 400ms duration | Duration: 400ms | Prototype panel | Primary timing |
| `cubic-bezier(0.34,1.56,0.64,1)` | Custom easing | Custom bezier | Prototype panel → Easing → Custom | Bounce-like curve |
| `transform: scale(1.5)` | 1.5x scale | Scale: 150% | Transform panel | Hover state |
| `translateY(-1.4rem)` | -1.4rem lift | Y: -22.4px | Transform panel | Hover state |
| `rotateX(6deg)` | 6° X rotation | Rotate X: 6° | Transform panel | 3D rotation |
| `transition-delay: 0.03s` | 3ms delay | Delay: 3ms | Prototype panel | Stagger timing |
| `backdrop-filter: blur(20px)` | 20px blur | Blur: 20px | Effects panel | Background blur |
| `box-shadow: 0 25px 50px` | Complex shadow | Drop shadow | Effects panel | Multiple shadows |

---

## Blueprint JSON

```json
{
  "component": "Dock Item",
  "variants": [
    {
      "name": "State",
      "props": {
        "idle": "Idle",
        "hovered": "Hovered",
        "neighbor1": "Neighbor 1",
        "neighbor2": "Neighbor 2",
        "neighbor3": "Neighbor 3",
        "neighbor4": "Neighbor 4",
        "pressed": "Pressed"
      }
    },
    {
      "name": "Icon",
      "props": {
        "mail": "Mail",
        "files": "Files",
        "photos": "Photos",
        "music": "Music",
        "tv": "TV",
        "browser": "Browser",
        "games": "Games",
        "settings": "Settings"
      }
    }
  ],
  "interactions": [
    {
      "from": "Idle",
      "trigger": "Hover In",
      "to": "Hovered",
      "animation": {
        "type": "smart_animate",
        "duration": 0.4,
        "easing": {
          "type": "cubic_bezier",
          "value": [0.34, 1.56, 0.64, 1]
        }
      }
    },
    {
      "from": "Idle",
      "trigger": "Hover In",
      "to": "Neighbor 1",
      "animation": {
        "type": "smart_animate",
        "duration": 0.4,
        "delay": 0.003,
        "easing": {
          "type": "cubic_bezier",
          "value": [0.34, 1.56, 0.64, 1]
        }
      }
    }
  ],
  "tokens": {
    "duration": {
      "primary": 400,
      "stagger1": 400,
      "stagger2": 350,
      "stagger3": 300,
      "stagger4": 250
    },
    "easing": {
      "bounce": [0.34, 1.56, 0.64, 1]
    },
    "scale": {
      "hover": 1.5,
      "neighbor1": 1.15,
      "neighbor2": 1.08,
      "neighbor3": 1.04,
      "neighbor4": 1.02
    },
    "lift": {
      "hover": -1.4,
      "neighbor1": -0.7,
      "neighbor2": -0.4,
      "neighbor3": -0.2,
      "neighbor4": -0.1
    }
  },
  "a11y": {
    "reduced_motion_variant": true,
    "focus_visible": true,
    "hit_area_min": 64
  },
  "qa": [
    "Hover out restores Idle within 400ms",
    "No layout shift > 1px during animation",
    "Neighbor cascade completes within 450ms total",
    "Touch devices show active state on press"
  ]
}
```

---

## Blueprint YAML

```yaml
component: Dock Item
variants:
  - name: State
    props:
      idle: Idle
      hovered: Hovered
      neighbor1: Neighbor 1
      neighbor2: Neighbor 2
      neighbor3: Neighbor 3
      neighbor4: Neighbor 4
      pressed: Pressed
  - name: Icon
    props:
      mail: Mail
      files: Files
      photos: Photos
      music: Music
      tv: TV
      browser: Browser
      games: Games
      settings: Settings

interactions:
  - from: Idle
    trigger: Hover In
    to: Hovered
    animation:
      type: smart_animate
      duration: 0.4
      easing:
        type: cubic_bezier
        value: [0.34, 1.56, 0.64, 1]
  - from: Idle
    trigger: Hover In
    to: Neighbor 1
    animation:
      type: smart_animate
      duration: 0.4
      delay: 0.003
      easing:
        type: cubic_bezier
        value: [0.34, 1.56, 0.64, 1]

tokens:
  duration:
    primary: 400
    stagger1: 400
    stagger2: 350
    stagger3: 300
    stagger4: 250
  easing:
    bounce: [0.34, 1.56, 0.64, 1]
  scale:
    hover: 1.5
    neighbor1: 1.15
    neighbor2: 1.08
    neighbor3: 1.04
    neighbor4: 1.02
  lift:
    hover: -1.4
    neighbor1: -0.7
    neighbor2: -0.4
    neighbor3: -0.2
    neighbor4: -0.1

a11y:
  reduced_motion_variant: true
  focus_visible: true
  hit_area_min: 64

qa:
  - Hover out restores Idle within 400ms
  - No layout shift > 1px during animation
  - Neighbor cascade completes within 450ms total
  - Touch devices show active state on press
```

---

## Assumptions & Risks

### ASSUMPTIONS
1. **Design System**: No existing motion tokens - proposing new ones
2. **Platform**: Web-focused but includes mobile considerations
3. **Performance**: Hardware acceleration and will-change properties assumed
4. **Accessibility**: WCAG 2.1 AA compliance assumed

### VALIDATION NEEDS
1. **Easing curves**: Test cubic-bezier approximation in Figma
2. **Stagger timing**: Verify Figma supports sub-10ms delays
3. **3D transforms**: Confirm rotateX renders correctly in Figma
4. **Performance**: Test with 8+ items in cascade

### TECHNICAL RISKS
1. **Easing approximation**: Custom bezier may not translate perfectly
2. **Stagger complexity**: 4-level neighbor cascade may be complex to implement
3. **3D rendering**: Figma may handle 3D transforms differently than browsers
4. **Performance**: Complex animations may cause lag in Figma

### UX RISKS
1. **Animation overload**: Too many simultaneous animations may feel overwhelming
2. **Timing perception**: 400ms may feel slow on fast devices
3. **Mobile experience**: Touch interactions may not match hover expectations
4. **Accessibility**: Complex animations may confuse users with cognitive disabilities