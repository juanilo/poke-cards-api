USE pokecards;

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(50),
    image_url TEXT,
    hp INT,
    attacks JSONB,
    rarity VARCHAR(50),
    resistance JSONB,
    weakness JSONB
);

INSERT INTO
    cards (
        name,
        type,
        image_url,
        hp,
        attacks,
        rarity,
        resistance,
        weakness
    )
VALUES (
        'Pikachu',
        'Basic',
        'https://i.pinimg.com/736x/00/dd/44/00dd440af1919a8533cc461c1691889b.jpg',
        60,
        '[
          {
            "id": 0,
            "name": "Meal Time",
            "damage": 90,
            "abilities": [
              {
                "type": "Electric",
                "value": 1
              }
            ]
          },
          {
            "id": 1,
            "name": "Gnaw",
            "damage": 20,
            "abilities": [
              {
                "type": "Electric",
                "value": 1
              },
              {
                "type": "Fairy",
                "value": 1
              }
            ]
          }
        ]',
        'Common',
        '{
          "type": "Iron",
          "value": 20
        }',
        '{
          "type": "Ground",
          "value": 2
        }'
    ),
    (
        'Charizard',
        'Stage II',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
        180,
        '[
          {
            "id": 0,
            "name": "Stoke",
            "damage": 0,
            "abilities": [
              {
                "type": "Fairy",
                "value": 1
              }
            ]
          },
          {
            "id": 1,
            "name": "Fire Blast",
            "damage": 120,
            "abilities": [
              {
                "type": "Fire",
                "value": 1
              },
               {
                "type": "Fairy",
                "value": 3
              }
            ]
          }
        ]',
        'Common',
        '{}',
        '{
          "type": "Water",
          "value": 2
        }'
    ),
    (
        'Feraligatr',
        'Stage II',
        'https://w7.pngwing.com/pngs/186/258/png-transparent-pokemon-ranger-pokemon-crystal-pokemon-red-and-blue-feraligatr-others-fictional-character-cartoon-pokemon-thumbnail.png',
        160,
        '[
          {
            "id": 0,
            "name": "Giant Wave",
            "damage": 160,
            "abilities": [
              {
                "type": "Water",
                "value": 2
              }
            ]
          }
        ]',
        'Common',
        '{}',
        '{
          "type": "Water",
          "value": 2
        }'
    ),
    (
        'Scizor',
        'Stage I',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3VykB-pIOOGJ13tEL8fVKdeFIXStaYSlJGgPkhxxerhhJrhrUMJ-ibkK1ywGFZAwr7k&usqp=CAU',
        120,
        '[
          {
            "id": 0,
            "name": "Special Blow",
            "damage": 60,
            "abilities": [
              {
                "type": "Iron",
                "value": 2
              },
              {
                "type": "Fairy",
                "value": 1
              }
            ]
          }
        ]',
        'Common',
        '{
          "type": "Electric",
          "value": 2
        }',
        '{
          "type": "Steel",
          "value": 20
        }'
    ),
    (
        'Onix',
        'Basic',
        'https://blenderartists.org/uploads/default/original/4X/0/d/e/0de15b2aa4fe8e6ba88a55ef9a16fa48c2d1ad6f.jpeg',
        60,
        '[
          {
            "id": 0,
            "name": "Slam",
            "damage": 20,
            "abilities": [
              {
                "type": "Fairy",
                "value": 2
              }
            ]
          },
          {
            "id": 1,
            "name": "Body Slam",
            "damage": 40,
            "abilities": [
              {
                "type": "Ground",
                "value": 4
              }
            ]
          }
        ]',
        'Common',
        '{}',
        '{
          "type": "Grass",
          "value": 20
        }'
    ),
    (
        'Sneasel',
        'Basic',
        'https://pokemon-project.com/pokedex/img/sprite/Home/256/215.png',
        70,
        '[
          {
            "id": 0,
            "name": "Dig Clawsd",
            "damage": 20,
            "abilities": [
              {
                "type": "Dark",
                "value": 1
              }
            ]
          }
        ]',
        'Rare',
        '{
          "type": "Electric",
          "value": 2
        }',
        '{
          "type": "Steel",
          "value": 20
        }'
    ),
    (
        'Treecko',
        'Basic',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSon09klPFrDdwY9Z-YbLc2TFoh4QRdi24FDA&s',
        40,
        '[
          {
            "id": 0,
            "name": "Pound",
            "damage": 10,
            "abilities": [
              {
                "type": "Fairy",
                "value": 1
              }
            ]
          },
          {
            "id": 1,
            "name": "Shining Claw",
            "damage": 10,
            "abilities": [
              {
                "type": "Psychic",
                "value": 1
              }
            ]
          }
        ]',
        'Common',
        '{
          "type": "Electric",
          "value": 2
        }',
        '{
          "type": "Steel",
          "value": 20
        }'
    ),
    (
        'Charmander',
        'Legendary',
        'https://pokemon-project.com/pokedex/img/sprite/Home/256/4.png',
        60,
        '[
          {
            "id": 0,
            "name": "Scratch",
            "damage": 10,
            "abilities": [
              {
                "type": "Fairy",
                "value": 1
              }
            ]
          },
          {
            "id": 1,
            "name": "Ember",
            "damage": 30,
            "abilities": [
              {
                "type": "Fire",
                "value": 1
              },
              {
                "type": "Fairy",
                "value": 1
              }
            ]
          }
        ]',
        'Uncommon',
        '{
          "type": "Water",
          "value": 2
        }',
        '{
          "type": "Fairy",
          "value": 20
        }'
    ),
    (
        'Charmeleon',
        'Stage I',
        'https://w7.pngwing.com/pngs/861/851/png-transparent-pokemon-x-and-y-pokemon-go-pokemon-diamond-and-pearl-pokemon-battle-revolution-charmeleon-pokemon-go-mammal-dragon-carnivoran-thumbnail.png',
        60,
        '[
          {
            "id": 0,
            "name": "Thunderbolt",
            "damage": 20,
            "abilities": [
              {
                "type": "Fire",
                "value": 1
              }
            ]
          },
          {
            "id": 1,
            "name": "Raging Claw",
            "damage": 20,
            "abilities": [
              {
                "type": "Fire",
                "value": 1
              },
              {
                "type": "Fairy",
                "value": 2
              }
            ]
          }
        ]',
        'Rare',
        '{
          "type": "Fairy",
          "value": 2
        }',
        '{
          "type": "Water",
          "value": 2
        }'
    )