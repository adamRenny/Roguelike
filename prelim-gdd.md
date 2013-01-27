# Turn Taking
1 Engine performs upkeep
2 Engine checks turn order
    a Checks for any multi-turn sets
3 Engine asks actionable entities for action

# Fighting
- Weapon has XdY to determine damage
- Damage is based on these factors:
    - Attack vs. Defense (Str & Vit primary)
    - Accuracy vs. Dodge (Dex & Agi primary)
    - Magic Attack vs. Magic Defense (Int & Sag primary)
- Effect of stats is based on aptitude of equipment and skill of user
- Damage = XdY + (atkA - defD) * weightAD + (atkAc - defDo) * weightAcDo + (atkMA - defMD) * weightMAMD

# Makeup
- Entity
    - Base
- Player : Entity
    - Actor
    - Player
- Enemy : Entity
    - Actor
    - Enemy
    - Trigger
- Item : Entity
    - Item
- Consumable : Item
    - Consumable
- Weapon : Item
    - Weapon
- Obstacle : Entity
    - Trigger
    - Actor Constraints

# Components
- Base
    - Stats
        - Health
        - Mana
        - Attack
        - Defense
        - Accuracy
        - Dodge
        - Magic Attack
        - Magic Defense
        - Strength
        - Vitality
        - Intelligence
        - Sagacity
        - Dexterity
        - Agility
        - Luck
    - Position
    - Occupies
- Actor
    - Inventory
    - Equipment
    - Aptitude
    - Sight
    - Actions available
        - Attack
        - Move
        - Act
        - Wait
    - Action Source
    - Interface to inform next action
    - links up to Player or AI
- Actor Constraints
    - Disallowed Actions
- Trigger
    - Trigger Type
        - Activated
        - Overlap
        - Touch
- Player
    - Level
        - Experience
- Enemy
    - Loot
        - Experience
        - Money
- Consumable
    - Uses
- Weapon
    - XdY

# Entity

- Player
- Enemy
- Trigger
    - Trap
    - Stairs
    - Door
    - Fountain
- Item

## Player
- Controlled by player
- Can Act
    - Use
    - Attack
    - Move
- Will trigger passive triggers
- Has Equipment
- Has Inventory
- Has Sight Distance
- Has Stats
   - Strength
   - Vitality
   - Intelligence
   - Sagacity
   - Dexterity
   - Agility
   - Luck
- Cannot share owned space
- Has aptitude

## Enemy/Obstacle
- Can Move
- AI Driven
    - Aggressive
    - Skiddish
    - Indifferent
    - Exploratory
- Can Act
    - Use
    - Attack
    - Move
- Will trigger passive triggers
- May have equipment
- May have inventory
- Has Sight Distance
- Has Stats
    - Strength
    - Vitality
    - Intelligence
    - Sagacity
    - Dexterity
    - Agility
- Cannot share owned space
- Has loot

## Trigger
- May move
- Trigger driven
    - Trigger zone
    - Passive - onMove
    - Active - onAct
- May be able to share space
- Has stats
    - Attack
    - Accuracy
    - Magic Attack

## Item
- May be used
    - Equipment
    - Consumable
    - Uses
- Cannot Move
- Able to share space
- Has Stats
    - Health
    - Mana
    - Attack
    - Defense
    - Accuracy
    - Dodge
    - Magic Attack
    - Magic Defense
    - Strength
    - Vitality
    - Intelligence
    - Sagacity
    - Dexterity
    - Agility
    - Luck
    - XdY