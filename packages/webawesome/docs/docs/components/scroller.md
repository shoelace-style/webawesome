---
title: Scroller
description: Scrollers create an accessible container while providing visual cues that help users identify and navigate through content that scrolls.
layout: component
category: Organization
---

```html {.example}
<wa-scroller id="scroller__overview">
  <table>
    <tr>
      <th>Party Role</th>
      <th>Combat Style</th>
      <th>Group Size</th>
      <th>Campaign Setting</th>
      <th>Signature Traits</th>
    </tr>
    <tr>
      <td>Warrior</td>
      <td>Melee Tank</td>
      <td>1-2</td>
      <td>Forgotten Realms</td>
      <td>Plate-armored swordmaster who taunts foes.</td>
    </tr>
    <tr>
      <td>Rogue</td>
      <td>Stealth Striker</td>
      <td>1</td>
      <td>Eberron</td>
      <td>Shadowy lockpick with daggers and a secret gold stash.</td>
    </tr>
    <tr>
      <td>Wizard</td>
      <td>Spell Slinger</td>
      <td>1</td>
      <td>Greyhawk</td>
      <td>Robe-clad mage hurling fireballs from a messy spellbook.</td>
    </tr>
    <tr>
      <td>Cleric</td>
      <td>Divine Support</td>
      <td>1</td>
      <td>Ravnica</td>
      <td>Holy healer with a glowing amulet and sneaky ale habit.</td>
    </tr>
    <tr>
      <td>Bard</td>
      <td>Charisma King</td>
      <td>1</td>
      <td>Dragonlance</td>
      <td>Lute-playing charmer with magical songs and bad puns.</td>
    </tr>
  </table>
</wa-scroller>

<style>
  #scroller__overview {
    table {
      margin-block: 0;
    }

    th,
    td {
      white-space: nowrap;
    }

    th:nth-child(5),
    td:nth-child(5) {
      min-width: 50ch;
      white-space: wrap;
    }
  }
</style>
```

## Examples

### Adding Content

The scroller component automatically provides a scrollable container for any content that exceeds the available space. Simply add your content as children of the `<wa-scroller>` element, and it will handle the rest.

```html {.example}
<wa-scroller>
  <div style="width: 1200px; padding: 1rem;">
    <h3>Superhero Team Roles Guide</h3>
    <div class="wa-grid" style="--wa-grid-columns: 4; --wa-grid-gap: var(--wa-spacing-l);">
      <div>
        <h4>Team Leaders</h4>
        <p>
          Charismatic captains like Captain America or Cyclops are the heart of any superteam, rallying everyone with
          epic speeches and killer strategies. They’re the ones calling the shots in a cosmic showdown, keeping the
          squad focused when Thanos or Magneto crashes the party.
        </p>
      </div>
      <div>
        <h4>Heavy Hitters</h4>
        <p>
          Powerhouses like Thor or Hulk bring the boom, smashing through villain lairs or alien armadas. Their job is to
          land the big punches, but they gotta pace themselves to avoid stealing the spotlight from sneakier teammates.
        </p>
      </div>
      <div>
        <h4>Tech Geniuses</h4>
        <p>
          Brainiacs like Iron Man or Mr. Fantastic keep the team one step ahead with gadgets and gizmos. They’re
          crafting quinjets or hacking evil AI, always ready with a snarky quip while saving the day from a computer
          terminal.
        </p>
      </div>
      <div>
        <h4>Stealth Specialists</h4>
        <p>
          Ninja-like heroes like Black Widow or Nightcrawler slip through the shadows, gathering intel or pulling off
          surprise attacks. They’re the glue that makes risky plans work, coordinating with the team to flip a losing
          fight into a win.
        </p>
      </div>
    </div>
  </div>
</wa-scroller>
```

### Orientation

Set the `orientation` attribute to `vertical` and provide a height to create a vertical scroller.

```html {.example}
<wa-scroller orientation="vertical" style="max-height: 300px;">
  <p>
    Superhero movies are the ultimate popcorn-fueled thrill rides, turning comic book pages into cinematic
    rollercoasters. Back in the early 2000s, films like X-Men and Spider-Man kicked open the door, proving tights and
    teamwork could pack theaters. Those early flicks leaned on practical effects and heart—like Tobey Maguire’s earnest
    web-slinger saving a train—making us believe a guy in spandex could be a hero. They weren’t perfect, but they set
    the stage for the genre to become a cultural juggernaut.
  </p>
  <p>
    By the 2010s, the Marvel Cinematic Universe turned superhero films into a shared saga, like a comic crossover event
    on steroids. The Avengers in 2012 was a game-changer, tossing Iron Man’s snark, Thor’s hammer, and Cap’s shield into
    one epic brawl. Directors learned to balance humor, heart, and explosions, while studios figured out how to make
    every movie feel like a chapter in a bigger story. Even standalone hits like Wonder Woman brought fresh vibes, with
    Gal Gadot’s lasso-wielding warrior stealing hearts and smashing box office records.
  </p>
  <p>
    Today, superhero flicks are a global obsession, from Deadpool’s chimichanga-fueled chaos to Black Panther’s Wakandan
    pride. They’re not just about powers—they’re about characters we root for, like Rocket Raccoon’s scrappy loyalty or
    Harley Quinn’s wild energy. Fans dissect trailers like detectives, theorizing about multiverses and cameos, while
    memes of sad Affleck or dancing Groot flood the internet. Whether it’s a gritty Joker origin or a cosmic Guardians
    adventure, these movies keep us glued to our seats, dreaming of heroism and one-liners that’d make even Tony Stark
    jealous.
  </p>
</wa-scroller>
```

### Without a Shadow

Use the `without-shadow` attribute to remove the fading shadow effect at the edges of the scroller, which typically indicates more content is available.

```html {.example}
<wa-scroller without-shadow>
  <div style="width: 1500px;">
    <p>
      Gaming consoles are like time machines for nerds, zapping us from pixelated 2D adventures to jaw-dropping
      cinematic worlds. Back in the ‘90s, the Super Nintendo was the cool kid on the block, using a 16-bit chip to pull
      off tricks like Mode 7, which made Mario Kart’s tracks feel like they were zooming right at you. It was like
      wizardry for a kid with a chunky controller, turning flat sprites into pseudo-3D races that had us yelling at our
      TVs when we got hit by a red shell.
    </p>
    <p>
      Fast-forward to today, and consoles like the PlayStation 5 and Xbox Series X are basically supercomputers in sleek
      boxes. They’re packing enough power to make games look like Hollywood blockbusters, with lighting so real you can
      practically feel the sun glare in Spider-Man: Miles Morales. These machines can handle massive open worlds, like
      the sprawling lands of Elden Ring, without breaking a sweat, letting you swing swords or race cars while your
      living room feels like a sci-fi movie set. It’s a far cry from the SNES days, but the vibe’s the same: pure,
      controller-gripping fun.
    </p>
    <p>
      What makes consoles the heart of gaming culture is how they bring everyone together, from casual players to
      hardcore speedrunners. Whether it’s your uncle fumbling through Super Mario World in ‘92 or your best friend
      screaming during a late-night Call of Duty match, consoles are the ultimate couch co-op machines. Modern systems
      even let you stream your clutch Fortnite wins to the world or jump into crossplay with PC pals. From the
      GameCube’s quirky handle to the Switch’s grab-and-go joy-cons, every console’s got its own personality, making
      every era of gaming feel like a legendary chapter in a never-ending quest.
    </p>
  </div>
</wa-scroller>
```

### Without a Scrollbar

Use the `without-scrollbar` attribute to hide the scrollbar while maintaining scroll functionality. This creates a cleaner visual appearance but may reduce usability on content that needs a clear scrolling indicator.

```html {.example}
<wa-scroller without-scrollbar>
  <div style="width: 1500px;">
    <p>
      Dungeons & Dragons 5e is the blockbuster superhero flick of tabletop RPGs, turning every session into an epic
      tavern brawl or dragon-slaying saga. Unlike the old 3.5e days, where you’d stack +30 bonuses like a mathlete on a
      mission, 5e keeps things chill with skill checks capping around +11—like a +5 from your slick Charisma and +6 from
      being a pro at persuasion. This means even a squad of scrappy kobolds can give your level 10 barbarian a bad day
      if you roll poorly. It’s like the game’s saying, “Sure, you’re a hero, but don’t get cocky!”
    </p>
    <p>
      The advantage and disadvantage system is 5e’s secret sauce, making every dice roll feel like a movie cliffhanger.
      Instead of juggling a dozen modifiers, you just roll two d20s and take the better (or worse) one, which shakes out
      to about a +5 or -5 vibe shift. It’s like your rogue’s got a lucky charm when sneaking past guards or a cursed
      boot when dodging a fireball. This keeps the game’s flow snappy, so you’re not stuck crunching numbers when you
      could be roleplaying a dramatic speech to charm a dragon or bluffing your way out of a bandit ambush.
    </p>
    <p>
      5e’s world is built for storytelling, not just stat sheets, and that’s why it’s the king of game nights. The rules
      are flexible enough for your DM to whip up a haunted forest crawl or a pirate ship heist without needing a PhD in
      game design. Classes like the warlock let you make shady pacts with cosmic entities, while feats like Tavern
      Brawler turn your monk into a bar-fighting legend who can knock out goblins with a chair. Whether you’re a newbie
      rolling your first d20 or a veteran plotting a castle siege, 5e’s vibe is all about epic moments—like when your
      party’s wizard crits on a fireball and you all cheer like you just won the Super Bowl.
    </p>
  </div>
</wa-scroller>
```

:::warning
Hiding scrollbars can negatively impact accessibility. Users who rely on visible scrollbars to navigate content may have difficulty recognizing that content is scrollable or controlling their scrolling position. Consider the needs of all users when implementing this option.
:::
