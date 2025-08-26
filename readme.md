# Mac Dock Micro-Interaction

This spec provides a comprehensive blueprint for the sophisticated CSS Mac Dock micro-interaction, with detailed motion specifications, component structure, and implementation guidance for designers and developers.

## Motion Design Philosophy

### 🎨 **Design-to-Code Harmony**
This implementation bridges the gap between design intent and technical execution, ensuring that every animation feels natural and responsive. The motion design follows Apple's principles of:

- **Smooth Transitions**: Natural easing curves that feel organic
- **Responsive Feedback**: Immediate response to user interactions
- **Visual Hierarchy**: Clear distinction between hover, active, and idle states
- **Performance**: Hardware-accelerated animations for smooth 60fps motion

### 🚀 **Easing Strategy**
- **Hover Effects**: `cubic-bezier(0.25,0.46,0.45,0.94)` - Natural deceleration
- **Bounce Animation**: `cubic-bezier(0.25,0.46,0.45,0.94)` - Smooth, controlled bounce
- **Neighbor Cascade**: `cubic-bezier(0.34,1.56,0.64,1)` - Bouncy, playful neighbors
- **Label Animations**: `cubic-bezier(0.34,1.56,0.64,1)` - Smooth scale and rotation

### 🎯 **Motion Tokens**
The system uses consistent motion tokens that can be easily mapped to Figma prototypes:
- **Duration**: 300ms (hover), 800ms (bounce), 400ms (staggered)
- **Easing**: Natural curves for smooth, professional feel
- **Scale**: Consistent 1.1x hover, 1.0x active for visual clarity
- **Position**: Precise vertical movements for authentic bounce physics

## Design-to-Dev Spec: Mac Dock Micro-Interaction

### 1. Interaction Summary (TL;DR)
A Mac-style dock with 5 icon items that features:

- **Primary hover**: Item scales up (1.1x), lifts (-1.4rem), rotates (6° X-axis), and gets enhanced shadows
- **Neighboring cascade**: Adjacent items scale progressively with staggered delays (3ms, 6ms, 9ms, 12ms)
- **Label reveal**: Black tooltip appears with scale and rotation animation
- **Smooth transitions**: 400ms duration with custom cubic-bezier easing
- **Background image**: Uses `Dock-Prototype.png` as full-screen background

### 2. Triggers & States

| Origin | Trigger | Destination | Notes |
|--------|---------|-------------|-------|
| Idle | Hover In | Hovered | Primary item scales 1.1x, lifts -2rem |
| Idle | Hover In | Neighbor 1 | Scales 1.15x, lifts -0.7rem, 3ms delay |
| Idle | Hover In | Neighbor 2 | Scales 1.08x, lifts -0.4rem, 6ms delay |
| Idle | Hover In | Neighbor 3 | Scales 1.04x, lifts -0.2rem, 9ms delay |
| Idle | Hover In | Neighbor 4 | Scales 1.02x, lifts -0.1rem, 12ms delay |
| Hovered | Hover Out | Idle | Restores to original state |
| Hovered | Click | Active | Returns to default size, then bounces with 2 jumps |
| Active | Click Other | New Active | Switches active state to new item (permanent) |

### 3. Motion Spec

| Property | From → To | Duration | Delay | Easing | Notes |
|----------|-----------|----------|-------|---------|-------|
| Transform (Hover) | scale(1) → scale(1.1) | 300ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Hover in |
| Transform (Hover) | translateY(0) → translateY(-2rem) | 300ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Hover in |
| Transform (Hover) | rotateX(0°) → rotateX(6°) | 300ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Hover in |
| Transform (Neighbor 1) | scale(1) → scale(1.15) | 400ms | 3ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Transform (Neighbor 2) | scale(1) → scale(1.08) | 350ms | 6ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Transform (Neighbor 3) | scale(1) → scale(1.04) | 300ms | 9ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Transform (Neighbor 4) | scale(1) → scale(1.02) | 250ms | 12ms | cubic-bezier(0.34,1.56,0.64,1) | Staggered |
| Opacity (Label) | 0 → 1 | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label reveal |
| Transform (Label) | scale(0.7) → scale(1) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label scale |
| Transform (Label) | translateY(1.5rem) → translateY(0) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label rotation |
| Transform (Label) | rotateX(-15°) → rotateX(0°) | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Label rotation |
| Box Shadow | Default → Enhanced | 400ms | 0ms | cubic-bezier(0.34,1.56,0.64,1) | Shadow depth |
| **Bounce Animation** | **2 Clean Jumps** | **800ms** | **0ms** | **cubic-bezier(0.25,0.46,0.45,0.94)** | **Click activation** |
| Transform (Bounce 1) | translateY(0) → translateY(-2.6rem) | 800ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | First jump |
| Transform (Bounce 2) | translateY(-1.6rem) → translateY(-2.2rem) | 800ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Second jump |
| Transform (Final) | translateY(-2.2rem) → translateY(-1.2rem) | 800ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Settle |
| Opacity (Dot) | 0 → 1 | 800ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Dot appear |
| Transform (Dot) | scale(0) → scale(1) | 800ms | 0ms | cubic-bezier(0.25,0.46,0.45,0.94) | Dot scale |

### 4. Component Structure

#### Layer Hierarchy
```
Dock Container
├── Dock Background
│   ├── Dock Reflection (::before)
│   └── Dock Border
├── Dock Item 1 (Firefox)
│   ├── Icon Container
│   └── Label (::after)
├── Dock Item 2 (ChatGPT)
│   ├── Icon Container
│   └── Label (::after)
├── Dock Item 3 (System Preferences)
│   ├── Icon Container
│   └── Label (::after)
├── Dock Item 4 (Trello)
│   ├── Icon Container
│   └── Label (::after)
├── Dock Item 5 (VS Code)
│   ├── Icon Container
│   └── Label (::after)
└── Active Dots (Independent Layer)
    ├── Dot 1 (Firefox) - left: 11%
    ├── Dot 2 (ChatGPT) - left: 30.5%
    ├── Dot 3 (System Preferences) - left: 50%
    ├── Dot 4 (Trello) - left: 69%
    └── Dot 5 (VS Code) - left: 89%
```

#### Naming Convention
- **Components**: Dock Item (with variants)
- **Layers**: Icon, Label
- **States**: Idle, Hovered, Neighbor 1, Neighbor 2, Neighbor 3, Neighbor 4, Pressed

#### Variants & Props
**Component**: Dock Item
**Variants**:
- **State**: Idle | Hovered | Neighbor 1 | Neighbor 2 | Neighbor 3 | Neighbor 4 | Pressed
- **Icon**: Firefox | ChatGPT | System Preferences | Trello | VS Code
- **Color**: Orange | Green | Blue | Blue | Blue/Black

### 5. Figma Interactions

#### Smart Animate Usage
- **Primary hover**: Use Smart Animate with "Prefer matching layers"
- **Neighboring cascade**: Use Smart Animate with staggered delays
- **Label reveal**: Use Smart Animate for scale + opacity + transform

#### Interaction Presets
- **On Hover**: Primary item transformation
- **While Hovering**: Neighboring item cascade
- **On Click**: Active state activation
- **Active State**: Indicator dot + enhanced styling
- **Active State**: Permanent until another item is clicked
- **State Switching**: Click different item to change active state

#### Animation Options
- **Duration**: 400ms (primary), 250-400ms (staggered)
- **Easing**: Custom cubic-bezier(0.34,1.56,0.64,1)
- **Stagger**: 3ms increments for neighboring items

### 6. Bounce Animation Details

#### Bounce Sequence (800ms)
1. **Start (0%)**: `translateY(0) scale(1.0) rotateX(0deg)` - Default position
2. **First Jump (25%)**: `translateY(-2.6rem) scale(1.0) rotateX(7.5deg)` - Highest point
3. **Bounce Down (50%)**: `translateY(-1.6rem) scale(1.0) rotateX(7deg)` - Middle position
4. **Second Jump (75%)**: `translateY(-2.2rem) scale(1.0) rotateX(7.5deg)` - Second peak
5. **Final Settle (100%)**: `translateY(-1.2rem) scale(1.0) rotateX(0deg)` - Active position

#### Dot Animation (Independent)
- **Position**: Fixed below dock at `bottom: 0.4rem`
- **Timing**: 800ms synchronized with bounce
- **Effect**: Scale from 0 to 1 with smooth appear
- **No Movement**: Stays at fixed position during bounce

### 7. Tokens (Design System)

| Token | Usage | Base Value | Notes |
|-------|-------|------------|-------|
| --duration-primary | Standard animations | 400ms | ± 50ms tolerance |
| --duration-stagger-1 | First neighbor | 400ms | 3ms delay |
| --duration-stagger-2 | Second neighbor | 350ms | 6ms delay |
| --duration-stagger-3 | Third neighbor | 300ms | 9ms delay |
| --duration-stagger-4 | Fourth neighbor | 250ms | 12ms delay |
| --ease-hover | Hover easing | cubic-bezier(0.25,0.46,0.45,0.94) | Smooth, natural |
| --ease-bounce | Bounce easing | cubic-bezier(0.25,0.46,0.45,0.94) | Smooth bounce |
| --ease-stagger | Stagger easing | cubic-bezier(0.34,1.56,0.64,1) | Bouncy neighbors |
| --scale-hover | Hover scale | 1.1 | ± 0.1 tolerance |
| --scale-neighbor-1 | First neighbor scale | 1.15 | ± 0.05 tolerance |
| --scale-neighbor-2 | Second neighbor scale | 1.08 | ± 0.05 tolerance |
| --scale-neighbor-3 | Third neighbor scale | 1.04 | ± 0.05 tolerance |
| --scale-neighbor-4 | Fourth neighbor scale | 1.02 | ± 0.05 tolerance |
| --scale-active | Active scale | 1.0 | ± 0.05 tolerance |
| --lift-hover | Hover lift | -2rem | ± 0.1rem tolerance |
| --lift-bounce-1 | First bounce | -2.6rem | ± 0.1rem tolerance |
| --lift-bounce-2 | Second bounce | -2.2rem | ± 0.1rem tolerance |
| --lift-final | Final position | -1.2rem | ± 0.1rem tolerance |
| --rotation-hover | Hover rotation | 6deg | ± 1deg tolerance |
| --duration-hover | Hover timing | 300ms | ± 25ms tolerance |
| --duration-bounce | Bounce timing | 800ms | ± 50ms tolerance |
| --blur-backdrop | Dock backdrop | 20px | ± 2px tolerance |
| --radius-dock | Dock corners | 2rem | ± 0.1rem tolerance |
| --radius-item | Item corners | 1rem | ± 0.05rem tolerance |

### 8. Accessibility (A11y)

#### Focus States
- **Focus visible**: 2px white outline with 3px offset
- **Focus transform**: Subtle lift (-0.2rem) and scale (1.02x)

#### Reduced Motion
- **Variant**: reduced-motion with simplified timing
- **Duration**: 200ms ease-out (vs 400ms)
- **Scale**: Reduced to 1.1x (vs 1.1x)
- **Neighbors**: Minimal scaling (1.05x)

#### Contrast & Hit Areas
- **Hit area**: 4rem × 4rem (64px × 64px) - meets WCAG guidelines
- **Label contrast**: Black background (rgba(0,0,0,0.85)) on white text
- **Focus indicator**: High contrast white outline

### 9. Platform Notes

#### Web Implementation
- **CSS Transitions**: Primary animation method
- **Transform3D**: Hardware acceleration enabled
- **Will-change**: Optimized for performance
- **Backface-visibility**: Prevents flickering

#### Figma vs Runtime
- **Easing curves**: Exact cubic-bezier values may need approximation
- **Stagger delays**: Figma supports delays but may need manual setup
- **3D transforms**: Figma supports rotateX but may render differently
- **Backdrop filters**: Figma supports blur effects

#### Responsive Considerations
- **Mobile**: Reduced scales (1.2x vs 1.1x) and lifts (-0.8rem vs -1.4rem)
- **Touch**: Active states optimized for touch interaction
- **Breakpoint**: 768px for mobile adjustments

### 10. QA Checklist

#### Edge Cases
- [ ] Hover out during animation (should complete gracefully)
- [ ] Rapid hover in/out (should handle interrupts)
- [ ] Multiple simultaneous hovers (should prioritize first)
- [ ] Touch device behavior (should work without hover)

#### Tolerances
- [ ] Scale accuracy: ±0.1 for primary, ±0.05 for neighbors
- [ ] Timing accuracy: ±50ms for primary, ±25ms for staggered
- [ ] Position accuracy: ±0.1rem for lifts
- [ ] Rotation accuracy: ±1deg for X-axis rotations

#### Hover-out Behavior
- [ ] Animation reverses smoothly
- [ ] All items return to idle state
- [ ] No layout shifts during transition
- [ ] Performance remains smooth

#### Interrupt Handling
- [ ] New hover cancels previous animation
- [ ] Smooth transition between different hover targets
- [ ] No animation conflicts or glitches
- [ ] Click activates new item smoothly
- [ ] Active state transitions properly between items

### 12. Current Implementation Status

#### ✅ **Completed Features**
- **Hover Effects**: Smooth scale (1.1x) and lift (-2rem) with 300ms timing
- **Neighbor Cascade**: Staggered animations with 3ms delays
- **Label System**: Black tooltips with scale and rotation animations
- **Bounce Animation**: 2-jump sequence with 800ms duration
- **Active State**: Permanent activation with independent dot indicators
- **Dot System**: Fixed positioning below dock (11%, 30.5%, 50%, 69%, 89%)
- **Smooth Transitions**: Natural easing with `cubic-bezier(0.25,0.46,0.45,0.94)`

#### 🎯 **Key Improvements Made**
- **Independent Dot Animation**: Dots no longer bounce with icons
- **Smooth Hover Transitions**: Reduced from 400ms to 300ms for responsiveness
- **Authentic Bounce Physics**: 2 clean jumps with realistic vertical movement
- **Clean State Management**: Hover effects disabled during active state
- **Performance Optimized**: Hardware acceleration with `will-change` properties

#### 🔧 **Technical Implementation**
- **CSS Animations**: Keyframe-based bounce sequences
- **JavaScript State Management**: Click handling with permanent active states
- **Responsive Design**: Mobile-optimized with touch interactions
- **Accessibility**: Focus states and reduced motion support

### 13. Handoff Pack

#### Exports
**Frames**:
- Dock - Idle State
- Dock - Hovered State
- Dock - Neighbor Cascade
- Dock - Active State
- Dock - Mobile Variant

**Videos**
- Primary hover: 400ms hover in/out cycle
- Neighbor cascade: Full staggered animation sequence
- Label reveal: Tooltip animation demonstration
- Mobile behavior: Touch interaction showcase

#### Naming Conventions
- **Components**: Dock Item / State=Hovered / Icon=Firefox
- **Layers**: Icon, Label, Background
- **Frames**: Dock - [State] - [Icon]
- **Variants**: State: [Idle|Hovered|Neighbor 1-4|Pressed]

#### Code → Figma Mapping Table

| Code | Value | Figma Equivalent | Where to Configure | Notes |
|------|-------|------------------|-------------------|-------|
| transition: all 0.4s | 400ms duration | Duration: 400ms | Prototype panel | Primary timing |
| cubic-bezier(0.34,1.56,0.64,1) | Custom easing | Custom bezier | Prototype panel → Easing → Custom | Bounce-like curve |
| transform: scale(1.1) | 1.1x scale | Scale: 110% | Transform panel | Hover state |
| translateY(-1.4rem) | -1.4rem lift | Y: -22.4px | Transform panel | Hover state |
| rotateX(6deg) | 6° X rotation | Rotate X: 6° | Transform panel | 3D rotation |
| transition-delay: 0.03s | 3ms delay | Delay: 3ms | Prototype panel | Stagger timing |
| backdrop-filter: blur(20px) | 20px blur | Blur: 20px | Effects panel | Background blur |
| box-shadow: 0 25px 50px | Complex shadow | Drop shadow | Effects panel | Multiple shadows |

### Blueprint JSON

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
        "firefox": "Firefox",
        "chatgpt": "ChatGPT",
        "system-preferences": "System Preferences",
        "trello": "Trello",
        "vscode": "VS Code"
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
    "hover": 1.1,
    "neighbor1": 1.15,
    "neighbor2": 1.08,
    "neighbor3": 1.04,
    "neighbor4": 1.02,
    "active": 1.05
  },
  "lift": {
    "hover": -1.4,
    "neighbor1": -0.7,
    "neighbor2": -0.4,
    "neighbor3": -0.2,
    "neighbor4": -0.1,
    "active": -0.5
  },
  "rotation": {
    "hover": 6,
    "active": 2
  },
  "duration": {
    "active": 200
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

### Blueprint YAML

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
      firefox: Firefox
      chatgpt: ChatGPT
      system-preferences: System Preferences
      trello: Trello
      vscode: VS Code

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
  hover: 1.1
  neighbor1: 1.15
  neighbor2: 1.08
  neighbor3: 1.04
  neighbor4: 1.02
  active: 1.05
lift:
  hover: -1.4
  neighbor1: -0.7
  neighbor2: -0.4
  neighbor3: -0.2
  neighbor4: -0.1
  active: -0.5
rotation:
  hover: 6
  active: 2
duration:
  active: 200

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

### Assumptions & Risks

#### ASSUMPTIONS
- **Design System**: No existing motion tokens - proposing new ones
- **Platform**: Web-focused but includes mobile considerations
- **Performance**: Hardware acceleration and will-change properties assumed
- **Accessibility**: WCAG 2.1 AA compliance assumed

#### VALIDATION NEEDS
- **Easing curves**: Test cubic-bezier approximation in Figma
- **Stagger timing**: Verify Figma supports sub-10ms delays
- **3D transforms**: Confirm rotateX renders correctly in Figma
- **Performance**: Test with 5+ items in cascade

#### TECHNICAL RISKS
- **Easing approximation**: Custom bezier may not translate perfectly
- **Stagger complexity**: 4-level neighbor cascade may be complex to implement
- **3D rendering**: Figma may handle 3D transforms differently than browsers
- **Performance**: Complex animations may cause lag in Figma

#### UX RISKS
- **Animation overload**: Too many simultaneous animations may feel overwhelming
- **Timing perception**: 400ms may feel slow on fast devices
- **Mobile experience**: Touch interactions may not match hover expectations
- **Accessibility**: Complex animations may confuse users with cognitive disabilities