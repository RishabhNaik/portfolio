Portfolio Website — Complete Layout Specification

1. Purpose

This document defines the complete layout and structural system for the portfolio website shown in the supplied visual reference.

The specification focuses only on:

page structure

section order

spatial relationships

proportions

positioning

composition

responsive behavior

interaction placement

Visual styling, typography, colors, final copy, imagery, animation, and technical implementation are intentionally left for a later stage.

The website should feel like one continuous visual portfolio rather than a collection of unrelated blocks.

2. Primary Page Structure

The home page follows this exact vertical sequence:

PAGE
│
├── HERO
│
├── INTRO / SECOND SECTION
│
├── FREE-MOVING PRINTED IMAGE FIELD
│
├── BTS MEDIA + INFORMATION
│
└── FOOTER

The page should read as a continuous journey:

INTRODUCTION
↓
CONTEXT
↓
VISUAL WORK / MEMORY FIELD
↓
BTS MEDIA
↓
CONTACT / CLOSING

There should be no additional major section inserted between these five primary areas unless specifically required later.

3. Global Layout Rules

3.1 Full-Width Composition

All primary sections occupy the full available viewport width.

The page should not be built as a narrow centered website contained inside a persistent maximum-width frame.

Individual content elements can have their own maximum widths, but section backgrounds and major visual compositions should extend from edge to edge.

┌──────────────────────────────────────────────────────────┐
│ │
│ FULL PAGE WIDTH │
│ │
└──────────────────────────────────────────────────────────┘

3.2 Vertical Flow

Sections follow one another directly.

┌─────────────────────────────┐
│ HERO │
└─────────────────────────────┘
┌─────────────────────────────┐
│ INTRO SECTION │
└─────────────────────────────┘
┌─────────────────────────────┐
│ PRINTED IMAGE FIELD │
└─────────────────────────────┘
┌─────────────────────────────┐
│ BTS MEDIA SECTION │
└─────────────────────────────┘
┌─────────────────────────────┐
│ FOOTER │
└─────────────────────────────┘

Avoid excessive boxed separation between sections.

4. Header Placement

The header is part of the hero composition.

It must not occupy a separate section above the hero.

┌──────────────────────────────────────────────────────────┐
│ Name Navigation │
│ │
│ │
│ HERO IMAGE │
│ │
│ │
└──────────────────────────────────────────────────────────┘

4.1 Header Position

Desktop:

name aligned toward the upper-left

navigation aligned toward the upper-right

both groups share the same horizontal baseline

minimal vertical footprint

The header overlays the hero rather than pushing the hero downward.

5. HERO SECTION

The hero is the first major visual section.

5.1 Structure

┌──────────────────────────────────────────────────────────┐
│ Name Navigation │
│ │
│ │
│ │
│ HERO VISUAL │
│ │
│ │
│ │
└──────────────────────────────────────────────────────────┘

The hero should be visually dominant.

5.2 Hero Dimensions

Desktop target:

width: 100vw

height: approximately 50–60vh

minimum height: approximately 520px

Tablet:

height: approximately 55–65vh

Mobile:

height: approximately 70–80vh

The hero should not become excessively short on small screens.

5.3 Hero Content Position

If a title or introductory visual label is used, it belongs inside the hero.

The main title should sit toward the lower portion of the image rather than occupying the exact center.

┌──────────────────────────────────────────────────────────┐
│ HEADER │
│ │
│ │
│ MAIN HERO VISUAL │
│ │
│ MAIN TITLE │
└──────────────────────────────────────────────────────────┘

6. SECTION 02 — INTRO / SECOND SECTION

Immediately after the hero comes the second major section.

This section is intentionally open.

The primary content is positioned around the middle of the section rather than being attached to the top edge.

┌──────────────────────────────────────────────────────────┐
│ │
│ │
│ │
│ MAIN CONTENT │
│ │
│ │
│ │
└──────────────────────────────────────────────────────────┘

6.1 Content Group

The section may contain:

introductory statement

short personal description

supporting media preview

The content should behave as one visual group.

6.2 Desktop Layout

┌──────────────────────────────────────────────────────────┐
│ │
│ │
│ ┌─────────────────────────┐ │
│ │ INTRO CONTENT │ │
│ │ │ │
│ │ MEDIA PREVIEW │ │
│ └─────────────────────────┘ │
│ │
│ │
└──────────────────────────────────────────────────────────┘

The content group should remain narrower than the viewport.

6.3 Section Height

Desktop:

approximately 300–450px

Mobile:

approximately 400–550px depending on content

7. SECTION 03 — FREE-MOVING PRINTED IMAGE FIELD

The third major section is a visual composition made from printed images.

This is not a conventional gallery or grid.

The entire section acts as an open surface.

┌──────────────────────────────────────────────────────────┐
│ │
│ ┌───────────┐ ┌─────────┐ │
│ │ IMAGE │ ┌────────┐ │ IMAGE │ │
│ └───────────┘ │ IMAGE │ └─────────┘ │
│ └────────┘ │
│ │
│ ┌──────────┐ ┌────────────┐ │
│ │ IMAGE │ │ IMAGE │ │
│ └──────────┘ └────────────┘ │
│ │
│ ┌────────────┐ ┌──────────┐ │
│ │ IMAGE │ │ IMAGE │ │
│ └────────────┘ └──────────┘ │
│ │
└──────────────────────────────────────────────────────────┘

The images are independent objects rather than repeated grid cells.

8. Printed Image Positioning

Each printed image should have:

its own position

its own size

its own rotation

its own depth relationship

optional overlap with neighboring images

The layout should feel manually composed.

Positions should remain deterministic and should not change randomly on each page load.

8.1 Image Distribution

Distribute images across:

upper-left

upper-middle

upper-right

center-left

center

center-right

lower-left

lower-middle

lower-right

Avoid placing every image at the same vertical level.

8.2 Overlap

Some images can overlap.

        ┌─────────────┐
        │    IMAGE    │
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │    IMAGE    │
        └─────────────┘

Overlap should remain controlled so that images stay readable.

8.3 Rotation

Small individual rotations can be used.

Suggested range:

-4deg → +4deg

Assign values deliberately rather than applying one identical rotation to every image.

9. Printed Image Sizes

Use multiple scales rather than one repeated dimension.

Suggested distribution:

Small
├── 140–180px wide

Medium
├── 200–280px wide

Large
└── 300–420px wide

The exact dimensions should respond to the viewport.

The important relationship is visible variation in scale.

10. Printed Image Field Height

Desktop:

approximately 600–800px

Tablet:

approximately 600–850px

Mobile:

approximately 700–1000px

The field should feel like a substantial visual installation rather than a short gallery.

On mobile, the composition can become taller while preserving independently positioned printed pieces.

11. Printed Image Interaction

Images may be interactive.

Possible behavior:

slight movement on hover

clicking opens the related work

selecting an image changes the BTS section

Interaction must not destroy the composition.

The default state should already look complete.

12. SECTION 04 — BTS MEDIA AREA

After the printed-image field comes the behind-the-scenes media area.

It contains two primary regions:

┌──────────────────────────────────────────────────────────┐
│ │
│ MEDIA PLAYER BTS DETAILS │
│ │
└──────────────────────────────────────────────────────────┘

The left region is visually dominant.

The right region contains supporting information.

13. BTS Section Desktop Grid

┌──────────────────────────────────────────────────────────┐
│ │
│ ┌─────────────────────────────────┐ ┌────────────┐ │
│ │ │ │ │ │
│ │ │ │ BTS │ │
│ │ MEDIA PLAYER │ │ SHOT │ │
│ │ │ │ DETAILS │ │
│ │ │ │ │ │
│ └─────────────────────────────────┘ └────────────┘ │
│ │
└──────────────────────────────────────────────────────────┘

Recommended horizontal relationship:

Media: 65–72%
Details: 28–35%

The exact ratio can change slightly according to the final content.

14. Media Player

The media player is the main visual object in the BTS section.

14.1 Player Area

Use a large landscape rectangle.

Suggested aspect ratio:

16 : 9

Another cinematic ratio may be used if the source media requires it.

14.2 Player Position

Desktop:

left side of the BTS section

vertically centered

generous surrounding space

separated from the details column

          MEDIA PLAYER
     ┌───────────────────────┐
     │                       │
     │       VIDEO / IMAGE   │
     │                       │
     └───────────────────────┘

15. iPod-Style Control

The media player has a separate physical-looking control inspired by an iPod.

The control is associated directly with the player.

     ┌──────────────────────────────┐
     │                              │
     │           MEDIA              │
     │                              │
     │                              │
     └──────────────────────────────┘
                  │
                  ▼
              ┌───────┐
             /                     │ CONTROL  │
            │    ◯     │
             \         /
              └───────┘

15.1 Control Position

Preferred desktop placement:

slightly below or overlapping the lower edge of the player

toward the lower-left or lower-center area

visually separate from the details column

It may partially overlap the player.

15.2 Control Function

The control can provide:

play/pause

previous

next

media selection

navigation between BTS shots

Its physical appearance should not compromise usability.

16. BTS Details Column

The right side contains information about the currently selected BTS shot.

┌──────────────────────┐
│ BTS SHOT │
│ │
│ Project │
│ Date │
│ Location │
│ │
│ Description │
│ │
│ Additional metadata │
└──────────────────────┘

The column should remain editorial rather than becoming a dense control panel.

17. BTS Details Vertical Position

The information should sit around the middle of the media player vertically.

Preferred relationship:

             ┌─────────────────────┐
             │                     │

PLAYER │ DETAILS │
│ │
└─────────────────────┘

Do not force the details to align with the top edge unless the final content requires it.

18. BTS Section Height

Desktop target:

approximately 550–750px

This allows enough room for:

large media

iPod control

metadata

surrounding whitespace

Do not compress the player and information into a shallow strip.

19. Relationship Between Printed Images and BTS Media

The printed-image field and BTS section should be connected conceptually.

When a printed image represents a BTS moment, selecting it can update:

Printed Image
↓
Selected BTS Shot
↓
Media Player
↓
BTS Details

Example:

IMAGE 01 selected
↓
PLAYER displays MEDIA 01
↓
DETAILS display BTS SHOT 01

This creates a direct relationship between the physical image field and the active media experience.

20. SECTION 05 — FOOTER

The footer is the final major section and follows the BTS area directly.

┌──────────────────────────────────────────────────────────┐
│ │
│ FOOTER │
│ │
└──────────────────────────────────────────────────────────┘

It should function as the closing composition of the page.

21. Footer Desktop Layout

The footer uses a horizontal arrangement.

┌──────────────────────────────────────────────────────────┐
│ │
│ ┌──────────┐ CLOSING MESSAGE CONTACT │
│ │ VISUAL │ │ │
│ │ │ multiline phrase EMAIL│ │
│ └──────────┘ PHONE│ │
│ SOCIAL│ │
│ │
│ COPYRIGHT │
└──────────────────────────────────────────────────────────┘

Primary regions:

visual element

closing phrase

contact details

social links

copyright

22. Footer Visual

The left portion contains the 3D/cube visual from the reference.

It should sit beside the closing message.

┌────────────┐
│ │
│ CUBE │
│ │
└────────────┘

The visual is compositional and should not consume most of the footer.

23. Footer Closing Phrase

The large closing phrase is positioned beside the visual.

Reference structure:

want
to
take a
bet?

Preserve the multiline arrangement.

Do not turn it into one horizontal sentence.

24. Footer Contact Area

Contact details are positioned toward the right.

Possible information:

phone

email

Social links appear nearby or below the contact information.

The contact group remains compact.

25. Footer Copyright

The copyright sits close to the lower edge of the footer and remains subordinate to the main composition.

                    COPYRIGHT

The exact wording is defined later.

26. Desktop Footer Height

Target:

approximately 220–300px

The footer should have sufficient vertical room for the visual, phrase, contact information, social links, and copyright without crowding.

27. Complete Desktop Layout

The entire page should read approximately as follows:

┌──────────────────────────────────────────────────────────┐
│ HEADER │
│ │
│ HERO │
│ │
│ │
├──────────────────────────────────────────────────────────┤
│ │
│ │
│ INTRO CONTENT │
│ │
│ │
├──────────────────────────────────────────────────────────┤
│ │
│ ┌───────┐ ┌─────────┐ │
│ │ PRINT │ ┌──────┐ │ PRINT │ │
│ └───────┘ │PRINT │ └─────────┘ │
│ └──────┘ │
│ │
│ ┌─────────┐ ┌──────────┐ │
│ │ PRINT │ │ PRINT │ │
│ └─────────┘ └──────────┘ │
│ │
│ ┌────────────┐ ┌───────┐ │
│ │ PRINT │ │ PRINT │ │
│ └────────────┘ └───────┘ │
│ │
├──────────────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────┐ ┌─────────────────┐ │
│ │ │ │ │ │
│ │ │ │ BTS DETAILS │ │
│ │ MEDIA PLAYER │ │ │ │
│ │ │ │ │ │
│ │ │ │ │ │
│ └─────────────────────────────┘ └─────────────────┘ │
│ ◯ │
│ iPod CONTROL │
│ │
├──────────────────────────────────────────────────────────┤
│ │
│ CUBE CLOSING MESSAGE CONTACT │
│ │
│ SOCIAL │
│ │
│ COPYRIGHT │
└──────────────────────────────────────────────────────────┘

28. Mobile Layout

The desktop composition should not simply be scaled down.

The hierarchy remains the same while the spatial relationships change.

The order must remain:

Hero
↓
Intro
↓
Printed Images
↓
Media Player
↓
BTS Details
↓
Footer

29. Mobile Hero

┌─────────────────────────────┐
│ HEADER │
│ │
│ │
│ HERO │
│ │
│ │
│ MAIN TITLE │
└─────────────────────────────┘

The header remains inside the hero.

30. Mobile Intro

┌─────────────────────────────┐
│ │
│ │
│ INTRO CONTENT │
│ │
│ MEDIA PREVIEW │
│ │
│ │
└─────────────────────────────┘

The content remains vertically centered.

31. Mobile Printed Image Field

The free-moving concept remains, but the composition becomes taller.

┌─────────────────────────────┐
│ │
│ ┌───────┐ │
│ │ IMAGE │ ┌──────┐ │
│ └───────┘ │IMAGE │ │
│ └──────┘ │
│ │
│ ┌─────────┐ │
│ │ IMAGE │ │
│ └─────────┘ │
│ │
│ ┌───────┐ │
│ │ IMAGE │ ┌────────┐ │
│ └───────┘ │ IMAGE │ │
│ └────────┘ │
│ │
│ ┌────────────┐ │
│ │ IMAGE │ │
│ └────────────┘ │
│ │
└─────────────────────────────┘

Do not convert the field into a normal vertical list.

32. Mobile BTS Section

The desktop two-column structure becomes vertical.

Correct order:

┌─────────────────────────────┐
│ │
│ MEDIA PLAYER │
│ │
│ │
└─────────────────────────────┘
◯
iPod CONTROL

┌─────────────────────────────┐
│ │
│ BTS DETAILS │
│ │
└─────────────────────────────┘

The player remains the primary visual.

The details follow underneath.

33. Mobile Footer

The footer becomes vertically stacked.

┌─────────────────────────────┐
│ │
│ CUBE │
│ │
│ want │
│ to │
│ take a │
│ bet? │
│ │
│ CONTACT │
│ EMAIL │
│ PHONE │
│ SOCIAL │
│ │
│ COPYRIGHT │
│ │
└─────────────────────────────┘

Retain the footer hierarchy rather than reducing every element to tiny text.

34. Tablet Layout

Tablet should sit between the desktop and mobile systems.

The printed-image section remains free-form.

The BTS section can remain two-column when sufficient horizontal space exists.

When there is insufficient width, switch to:

MEDIA PLAYER
↓
iPod CONTROL
↓
BTS DETAILS

The breakpoint should be determined by available composition width.

35. Section Relationships

Each section has a distinct structural role.

Hero

Establishes identity and the visual opening.

Intro

Provides context after the initial visual.

Printed Images

Presents work as a collection of physical visual artifacts.

BTS Media

Turns one visual artifact into an active media experience with contextual information.

Footer

Closes the experience and provides contact/social destinations.

36. Alignment System

The page uses recurring horizontal anchors without forcing every element into one rigid grid.

LEFT EDGE
│
├── Hero/header alignment
├── Media player alignment
└── Footer visual alignment

CENTER
│
├── Intro content
└── Selected visual relationships

RIGHT EDGE
├── Header navigation
├── BTS details
└── Footer contact

Large visual elements may extend beyond the narrower text alignment system.

37. Content Widths

Use a hierarchy of widths:

FULL VIEWPORT
↓
LARGE VISUAL MEDIA
↓
SECTION COMPOSITION
↓
CONTENT GROUP
↓
TEXT COLUMN

Large imagery can use almost the entire viewport.

Textual content should remain narrower and readable.

Do not make body content span from edge to edge.

38. Spacing Philosophy

Spacing should create rhythm between sections and elements.

Use:

large separation between major compositions where needed

medium separation between related elements

small separation between tightly related metadata

Do not make every gap identical.

Open areas are intentional layout elements.

39. Layering Concept for Printed Images

The printed image field uses controlled depth.

Conceptual stacking:

Background
↓
Surface
↓
Printed images
↓
Overlapping images
↓
Selected image
↓
Interactive control

A selected image may move above nearby images without rearranging the complete composition.

40. Navigation Flow

The main navigation can connect to the major portfolio areas.

HOME
↓
HERO
↓
INTRO
↓
WORK / PRINTED IMAGES
↓
BTS MEDIA
↓
CONTACT / FOOTER

The navigation should not introduce unnecessary structural layers.

41. Project / BTS Selection Flow

The intended relationship is:

Printed Image
↓
Select
↓
BTS Media Player
↓
Selected BTS Shot
↓
Details Update

For example:

IMAGE 01 selected
↓
PLAYER displays MEDIA 01
↓
DETAILS display BTS SHOT 01

The printed images therefore function as visual entry points into the BTS material.

42. Media Control Flow

The iPod-style control operates within the BTS media area.

Previous
↓
Current BTS Shot
↓
Next

When the selected media changes:

MEDIA PLAYER +
BTS DETAILS

update together.

The control should not navigate the user away from the section simply to change media.

43. Empty Space

Empty space is intentional.

Do not automatically fill open regions with:

cards

extra paragraphs

statistics

unnecessary buttons

decorative graphics

additional navigation

If a section needs open space for the composition, preserve it.

44. Structural Restrictions

Do not:

turn the printed-image field into a standard grid

place BTS details above the player on desktop

put the iPod control in the footer

place the header above the hero

turn the intro into a conventional card

create a persistent website-wide sidebar

put the footer inside the BTS section

make the player and details equal width when the player is intended to dominate

make every section the same height

force every object into one common grid

convert the printed-image field into a carousel

remove the relationship between printed images and BTS media

45. Complete Structural Blueprint

┌──────────────────────────────────────────────────────────┐
│ HERO │
│ │
│ HEADER │
│ │
│ MAIN VISUAL │
│ │
└──────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────┐
│ │
│ │
│ INTRO CONTENT │
│ │
│ MEDIA PREVIEW │
│ │
│ │
└──────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────┐
│ │
│ PRINTED IMAGE PRINTED IMAGE │
│ │
│ PRINTED IMAGE │
│ │
│ PRINTED IMAGE PRINTED IMAGE │
│ │
│ PRINTED IMAGE │
│ │
└──────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────┐
│ │
│ ┌─────────────────────────────┐ ┌─────────────────┐ │
│ │ │ │ │ │
│ │ │ │ BTS DETAILS │ │
│ │ MEDIA PLAYER │ │ │ │
│ │ │ │ │ │
│ │ │ │ │ │
│ └─────────────────────────────┘ └─────────────────┘ │
│ ◯ │
│ iPod CONTROL │
│ │
└──────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────┐
│ │
│ CUBE CLOSING MESSAGE CONTACT │
│ │
│ SOCIAL │
│ │
│ COPYRIGHT │
│ │
└──────────────────────────────────────────────────────────┘

46. Final Layout Definition

The website is defined by exactly five primary sections:

01 — Hero

A large full-width visual opening with the navigation overlaid inside it.

02 — Intro

A spacious section where the primary introductory content sits around the middle.

03 — Printed Image Field

A large open composition containing independently positioned printed images. The images are free-moving within the visual field and are not arranged as a standard gallery.

04 — BTS Media

A horizontal desktop composition with:

dominant media player on the left

iPod-style physical control associated with the player

BTS shot details on the right

On mobile, these elements stack vertically.

05 — Footer

A closing composition containing:

visual object

multiline closing message

contact information

social links

copyright

This five-section structure is the base layout. All later visual decisions should be applied on top of this structure without changing the hierarchy unless explicitly required.
