# ABTalks — AI Development Prompts

This file documents the prompts used during the AI-assisted development of the ABTalks hackathon project.

The prompts were used iteratively to design, implement, refine, test, and prepare the project for deployment.

---

# Prompt 1 — Initial Product Redesign

## Objective

Redesign ABTalks as a mobile-first 60-day coding challenge platform for Indian college students.

## Prompt

> Reimagine the ABTalks platform as a premium, mobile-first 60-day coding challenge experience.
>
> ABTalks runs a 60-day coding challenge for Indian college students. Students pick a track, build something every day, and maintain a public learning streak by submitting:
>
> - A GitHub commit
> - A LinkedIn post
>
> The platform should help students build consistency and become visible to recruiters.
>
> Build the following minimum screens:
>
> 1. Landing Page `/`
> 2. Student Dashboard `/dashboard`
> 3. Challenge Day `/day/12`
>
> The landing page should clearly communicate what ABTalks is, why students should join, and how the 60-day challenge works.
>
> The dashboard should show:
>
> - Current streak
> - Today's task
> - Challenge progress
> - Overall completion
> - Student achievements/standing
>
> The challenge page should allow students to:
>
> - Read the day's mission
> - Understand what needs to be built
> - Submit GitHub proof
> - Submit LinkedIn proof
> - Add a daily reflection
>
> Design mobile-first at 390px because most users will access the product from their phones.
>
> Also support desktop and tablet layouts.
>
> Use realistic mocked data instead of a production database.
>
> Include at least one thoughtful product idea that improves the student's experience.
>
> Prioritize premium UI, clarity, usability, accessibility, responsive design, and strong product thinking.

---

# Prompt 2 — Premium UI, Theme and Authentication Experience

## Objective

Improve the initial generated design while preserving the existing functionality.

## Prompt

> Keep everything that already exists in the ABTalks project.
>
> Do not remove existing functionality.
>
> Improve the visual design so it feels like a premium modern product rather than a basic AI-generated demo.
>
> The current theme is too dark and the day/night modes look too similar because both use similar gradients.
>
> Make Light Mode and Dark Mode visually distinct.
>
> Light Mode must have strong text contrast and readable content.
>
> Dark Mode should remain premium but should not make every component look identical.
>
> Preserve all existing pages, components, challenge functionality, dashboard functionality, and responsive behavior.
>
> Also add:
>
> - Login page
> - Registration page for new users
> - Navigation between landing page, login, registration, dashboard and challenge
>
> Do not use authentication or a backend because this is a hackathon prototype using mocked data.
>
> Make the experience feel like a real product.

---

# Prompt 3 — Mobile-First Responsive Redesign

## Objective

Fix the mobile and tablet experience without simply compressing the desktop layout.

## Prompt

> The desktop UI is good, but the mobile and tablet UI is poor because the desktop layout is being compressed instead of redesigned responsively.
>
> Redesign the responsive experience.
>
> The application must be mobile-first, especially at 390px width.
>
> Do NOT simply shrink desktop components.
>
> Use responsive layouts similar to high-quality consumer web applications.
>
> On mobile:
>
> - Recompose cards instead of only shrinking them
> - Reflow content naturally
> - Prevent text from overflowing containers
> - Prevent containers from becoming extremely tall
> - Make buttons easily tappable
> - Keep important actions visible
> - Use mobile-friendly navigation
> - Preserve all functionality
>
> On tablet:
>
> - Use an appropriate intermediate layout
> - Do not use the desktop layout scaled down
>
> On desktop:
>
> - Preserve the existing strong desktop design
>
> The same functionality must exist on desktop, tablet and mobile.
>
> Do not remove functionality to make the mobile layout easier.

---

# Prompt 4 — Mobile Navigation and Layout Correction

## Objective

Fix missing navigation and mobile-specific layout problems.

## Prompt

> The mobile UI still has serious problems.
>
> Some text is overflowing containers and some cards become extremely tall and narrow.
>
> The mobile UI should feel intentionally designed for mobile rather than like a compressed desktop page.
>
> Also fix the navigation.
>
> The mobile navbar currently only exposes the landing page and does not provide navigation to important areas such as:
>
> - Dashboard
> - Login
> - Registration
> - Challenge
>
> Create a proper responsive navigation system.
>
> Preserve the desktop navigation.
>
> Make sure the mobile navigation provides access to all important routes without overcrowding the screen.
>
> Also verify:
>
> - No horizontal overflow
> - No clipped text
> - No overlapping elements
> - No missing buttons
> - Proper spacing
> - Proper touch targets
> - Good 390px layout
> - Good tablet layout
>
> Do not remove the existing mobile/tablet functionality.
>
> Do not redesign unrelated desktop components.

---

# Prompt 5 — Light Mode Readability and Responsive Function Preservation

## Objective

Fix light mode while preserving the existing responsive functionality.

## Prompt

> Fix the light mode readability issues throughout the application.
>
> There are places where text becomes difficult or impossible to read because the text color does not have enough contrast with the background or container.
>
> Audit all major components in Light Mode.
>
> Ensure:
>
> - Headings are readable
> - Body text is readable
> - Labels are readable
> - Form inputs are readable
> - Cards have sufficient contrast
> - Buttons have readable text
> - Challenge statements are readable
>
> Dark Mode should continue working.
>
> IMPORTANT:
>
> Do NOT remove the existing mobile/tablet responsive functionality.
>
> Mobile and tablet users must still have their responsive layouts.
>
> Desktop, tablet and mobile should all provide the same functionality with appropriately adapted layouts.
>
> Also make sure navigation back to the landing page is available.
>
> Do not change unrelated functionality.

---

# Prompt 6 — Day 12 Submission Bug Investigation

## Objective

Investigate why the Day 12 submission button was missing on mobile.

## Prompt

> Investigate the Day 12 submission UI bug.
>
> The submission button appears on desktop but is missing at 390px mobile width.
>
> Do not assume this is purely a CSS problem.
>
> Inspect the actual component rendering and state logic.
>
> Compare:
>
> - Desktop SubmissionSection
> - MobileChallenge
> - AppContext
> - Submission state
> - Local/mock storage
>
> Determine whether the mobile component is rendering a different state from desktop.
>
> The submission UI must exist on both desktop and mobile.
>
> Desktop and mobile may use different layouts, but they must consume the same submission state.
>
> Do not use viewport/device type to determine whether the submission is completed.

---

# Prompt 7 — Shared Submission State Fix

## Objective

Fix the Day 12 submission state so desktop and mobile use one source of truth.

## Prompt

> The Day 12 submission state must have ONE source of truth.
>
> Do not determine completion based on viewport or device type.
>
> Both desktop and mobile must consume the same AppContext/state.
>
> Conceptually:
>
> Shared submission state
>
> → Desktop submission UI
>
> → Mobile submission UI
>
> Fresh Day 12 state:
>
> `isVerified = false`
>
> `isSubmitted = false`
>
> `completed = false`
>
> Therefore both desktop and mobile must show:
>
> - GitHub Repository URL
> - LinkedIn Post URL
> - What did you learn today?
> - COMPLETE DAY 12 button
>
> After successful submission:
>
> `isVerified = true`
>
> `isSubmitted = true`
>
> `completed = true`
>
> Therefore both desktop and mobile must show:
>
> - DAY 12 COMPLETE
> - +150 XP EARNED
> - STREAK PROTECTED
> - Back to Dashboard
>
> Inspect the existing state machine before changing code.
>
> Do not hardcode the UI to always show false.
>
> Existing localStorage/mock state may contain a previously completed Day 12.
>
> Provide a safe development reset for Day 12 so a fresh unsubmitted state can be tested.
>
> Do not modify unrelated UI.

---

# Prompt 8 — Regression Investigation

## Objective

A previous submission-state change caused the submission UI to disappear on both desktop and mobile.

## Prompt

> STOP. There is now a regression.
>
> The Day 12 submission UI is missing from BOTH:
>
> - Mobile 390px
> - Desktop
>
> Do not make another speculative change.
>
> First inspect the current diff/history of the changes that were just made.
>
> Identify exactly which change caused the submission form/button to disappear globally.
>
> If possible, revert ONLY that incorrect change.
>
> Do not revert the entire project.
>
> We need ONE shared submission state and TWO responsive presentations.
>
> Both must support:
>
> BEFORE SUBMISSION:
>
> - GitHub Repository URL
> - LinkedIn Post URL
> - What did you learn today?
> - COMPLETE DAY 12
>
> AFTER SUBMISSION:
>
> - DAY 12 COMPLETE
> - +150 XP EARNED
> - STREAK PROTECTED
> - Back to Dashboard
>
> Desktop and mobile must read the same AppContext submission state.
>
> Do not use viewport/device type to determine completion.
>
> Test:
>
> 1. Desktop fresh state → submission button
> 2. 390px fresh state → submission button
> 3. Submit on desktop → completed state
> 4. Resize/open mobile → completed state
> 5. Reset → submission button on both
> 6. Submit on mobile → completed state on both
>
> Actually run the application and verify both viewport sizes.
>
> Do not modify:
>
> - navbar
> - landing page
> - dashboard
> - theme
> - colors
> - typography
> - existing responsive design
>
> Only fix the submission state regression.

---

# Prompt 9 — Edge Case Architecture Inspection

## Objective

Add the required hackathon edge cases without immediately modifying the code.

## Prompt

> We have completed the core functionality QA.
>
> Now inspect the existing architecture for implementing the required real-world edge cases:
>
> 1. First Day / No Streak
> 2. Missed Day
> 3. Empty Profile
>
> Also introduce a thoughtful product feature:
>
> "Proof Before You Forget"
>
> This should help students remember to finish their GitHub and LinkedIn proof after building.
>
> First inspect only.
>
> Do not modify files yet.
>
> Inspect:
>
> - AppContext
> - mock data
> - storage utilities
> - Dashboard
> - Challenge Day
> - Profile
> - navigation
> - existing state simulator
> - streak logic
> - submission logic
>
> Determine:
>
> - Existing architecture
> - Existing state system
> - Best files/components to modify
> - How each edge case should be represented
> - How Proof Before You Forget should integrate
> - Potential regression risks
>
> Wait for approval before changing code.

---

# Prompt 10 — Edge Case Implementation

## Objective

Implement the edge cases and Proof Before You Forget while protecting the existing application.

## Prompt

> Approved — proceed with implementation.
>
> The proposed architecture is good.
>
> However, this is an existing working hackathon project, so preservation is the highest priority.
>
> Do not break or remove existing functionality.
>
> Preserve:
>
> - Landing page
> - Login
> - Registration
> - Dashboard
> - /day/12
> - GitHub submission
> - LinkedIn submission
> - Reflection
> - Complete Day flow
> - Desktop layout
> - 390px mobile layout
> - Tablet layout
> - Light Mode
> - Dark Mode
> - Theme switching
> - Navigation
> - State Simulator
> - Mock persistence
> - Streak logic
> - Challenge progress
>
> Implement:
>
> ### First Day
>
> When enabled:
>
> - currentDay = 1
> - streakDays = 0
> - longestStreak = 0
> - totalXp = 0
> - level = 1
>
> Provide an encouraging Day 1 experience.
>
> ### Missed Day
>
> When enabled:
>
> - streakDays = 0
> - Show recovery experience
> - Preserve historical completed days
> - Do not destroy challenge progress
>
> ### Empty Profile
>
> When enabled:
>
> - name = ''
> - college = ''
> - Preserve safe defaults
> - Show a non-blocking profile completion prompt
>
> ### Proof Before You Forget
>
> Implement:
>
> BUILD ✓
> GITHUB ○
> LINKEDIN ○
>
> "Don't lose today's proof"
>
> [ Finish Proof → ]
>
> This must reuse the existing submission state and handlers.
>
> Do not create a second submission system.
>
> Add simulator options for:
>
> - First Day
> - Missed Day
> - Empty Profile
> - Proof Pending
>
> Default state must remain the normal working application.
>
> Test:
>
> - Normal state
> - First Day
> - Missed Day
> - Empty Profile
> - Proof Pending
> - Day 12 submission
> - 390px
> - 768px
> - Desktop
> - Light Mode
> - Dark Mode
>
> Do not make unrelated redesign changes.

---

# Prompt 11 — Production Readiness

## Objective

Prepare the completed project for deployment.

## Prompt

> The core product functionality and responsive QA are complete.
>
> Do not add new features or redesign anything.
>
> Prepare the project for hackathon deployment.
>
> Perform a production-readiness check.
>
> 1. Run the production build.
> 2. Fix only genuine build/runtime errors.
> 3. Do not change working UI unnecessarily.
> 4. Verify:
>
> `/`
> `/dashboard`
> `/day/12`
> `/login`
> `/register`
>
> 5. Make sure direct navigation/refresh works.
> 6. Check for console-breaking errors.
> 7. Check for missing assets.
> 8. Check:
>
> - 390px
> - 768px
> - Desktop
>
> 9. Do not modify the existing submission flow.
>
> At the end report:
>
> BUILD: PASS/FAIL
>
> ROUTES: PASS/FAIL
>
> DIRECT REFRESH: PASS/FAIL
>
> 390px: PASS/FAIL
>
> 768px: PASS/FAIL
>
> DESKTOP: PASS/FAIL
>
> CONSOLE ERRORS: YES/NO
>
> DEPLOYMENT READY: YES/NO

---

# Prompt 12 — GitHub Repository Preparation

## Objective

Prepare the project for repository submission and deployment.

## Prompt

> Prepare the completed ABTalks project for GitHub and deployment.
>
> Ensure the project is in a clean working state.
>
> Check that:
>
> - Source code is present
> - package.json is present
> - README.md is present
> - PROMPTS.md is present
> - .gitignore is configured
> - secrets are not committed
> - .env files are not committed
> - node_modules is not committed
> - production build works
>
> Do not modify application functionality.
>
> Do not redesign the UI.
>
> Only make repository/deployment-readiness fixes if necessary.

---

# AI Development Process

The project was developed iteratively using AI assistance.

The workflow followed:

1. Product requirements analysis
2. Initial UI and architecture generation
3. Responsive/mobile-first refinement
4. Theme and navigation refinement
5. Submission state debugging
6. Shared state architecture correction
7. Regression testing
8. Edge-case implementation
9. Product feature development
10. Production-readiness testing
11. GitHub repository preparation
12. Deployment preparation

The AI was used as a development assistant, while implementation decisions, testing, iteration, and validation were performed during the development process.

---

# Core Product Concept

ABTalks follows the loop:

**Learn → Build → Prove → Share → Repeat**

The main product insight is that consistency is not only about building code every day. Students also need to consistently publish proof of their work.

This led to the "Proof Before You Forget" concept, which connects the build completion experience directly to GitHub and LinkedIn proof submission.

---

# Required Hackathon Routes

/
 
/dashboard

/day/12