# 3D Components

This directory contains all 3D-related components for the immersive website experience.

## Installed Dependencies

- **Three.js** (^0.180.0): Core 3D rendering engine
- **@react-three/fiber** (^9.4.0): React integration for Three.js
- **@react-three/drei** (^10.7.6): Helper components and utilities
- **framer-motion** (^12.23.24): Advanced animation library
- **gsap** (^3.13.0): High-performance animations
- **lenis** (^1.3.11): Smooth scrolling library

## Core Components

### Scene3D
Main 3D scene wrapper that sets up the Three.js canvas and basic lighting.

### ParticleSystem
Instanced particle rendering system with mouse interaction and scroll responsiveness.

### AnimatedSection
Wrapper component for content sections with entrance/exit animations.

### ScrollAnimationManager
Manages smooth scrolling using Lenis with momentum-based scrolling.

### PerformanceMonitor
Monitors FPS and memory usage for automatic performance optimization.

## Enhanced Components (Placeholders)

- **Hero3D**: Enhanced hero section with 3D effects (Task 4)
- **Header3D**: 3D navigation with morphing effects (Task 5)
- **Events3D**: Event cards with 3D flip animations (Task 6)

## Testing

Use the `Test3D` component to verify that the 3D setup is working correctly:

```tsx
import { Test3D } from './components/3d';

// Add to your App.tsx temporarily
<Test3D />
```

## TypeScript Support

All components include full TypeScript support with interfaces defined in `src/types/3d.ts`.

## Utilities

3D utility functions are available in `src/lib/3d-utils.ts` including:
- Device capability detection
- Performance mode recommendations
- Optimized geometry creation
- Resource disposal helpers
- Particle position generators

## Performance Considerations

The system automatically detects device capabilities and adjusts performance settings accordingly:
- **High Performance**: Full effects with high particle counts
- **Medium Performance**: Reduced particle counts and simplified effects
- **Low Performance**: Minimal effects with fallbacks

## Next Steps

1. Implement smooth scrolling system (Task 2)
2. Create core 3D scene infrastructure (Task 3)
3. Transform existing components with 3D effects (Tasks 4-6)