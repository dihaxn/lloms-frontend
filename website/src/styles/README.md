# CSS Organization Guide

This folder contains all the CSS styles for the Little Lanka website, organized by functionality and component type.

## File Structure

### Core Styles

- **`index.css`** - Main CSS file that imports all other styles and contains global variables
- **`design-system.css`** - Design system variables, typography, and base styles
- **`App.css`** - Application-specific styles
- **`components.css`** - Reusable component styles
- **`scrollbar.css`** - Custom scrollbar styling

### Component-Specific Styles

- **`outlet-cards.css`** - All outlet card related styles (moved from component folders)
- **`carousel.css`** - Carousel and container styles for outlet display

### Theme Configuration

- **`theme.js`** - JavaScript theme configuration and color schemes

## Import Order

The CSS files are imported in a specific order in `index.css`:

1. `design-system.css` - Base design variables and system styles
2. `outlet-cards.css` - Outlet card component styles
3. `carousel.css` - Carousel and container styles
4. `tailwindcss` - Tailwind CSS framework
5. Component-specific styles

## Benefits of This Organization

✅ **Centralized Management** - All styles are in one location
✅ **Better Maintainability** - Easier to find and update styles
✅ **Reduced Duplication** - No more scattered CSS files
✅ **Cleaner Components** - Components focus on logic, not styling
✅ **Better Performance** - Styles are imported once globally
✅ **Easier Debugging** - All styles are in the styles folder

## Adding New Styles

When adding new styles:

1. **Component-specific styles** → Add to appropriate CSS file in `src/styles/`
2. **Global styles** → Add to `index.css` or `design-system.css`
3. **New component categories** → Create new CSS file and import in `index.css`

## Migration Notes

The following CSS files were moved from component folders:

- `src/websiteComponents/outletCard/OutletCard.css` → `src/styles/outlet-cards.css`
- `src/websiteComponents/outletCardContainer/OutletCardContainer.css` → `src/styles/carousel.css`

All component imports have been updated to use the global styles.

## Best Practices

- Keep styles organized by functionality
- Use consistent naming conventions
- Document complex CSS rules
- Test responsive behavior across breakpoints
- Maintain accessibility standards
