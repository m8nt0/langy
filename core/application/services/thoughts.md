▶️ /services

    What goes here: Business logic helpers that are not full use cases

    Example: SearchService.ts, NavigationService.ts

    Why: Services hold shared logic used by multiple use cases (e.g., filtering, navigation)

    Note: These might use domain entities/VOs but should avoid talking to infrastructure directly.