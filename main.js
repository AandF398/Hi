import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
import loadAssets from "./assets"
import maps from "./maps"

kaboom({
    background: [200, 255, 250],

})

loadAssets()
var score = 0
const walkFrames = [];
const totalFrames = 7;
let currentFrame = 0
let frameTimer = 0
let lastCheckpoint = vec2(30, 0);
const frameInterval = 0.05
let velocityX = 0;

const numSides = 360; // Increase for a more circular shape
const radius = 20;

const circleVertices = [];
for (let i = 0; i < numSides; i++) {
    const angle = i * 2 * Math.PI / numSides;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    circleVertices.push({ x: x, y: y });
}

for (let i = 0; i <= totalFrames; i++) {
    const name = `walk${i}`;
    loadSprite(name, `/sprites/${name}.svg`);
    walkFrames.push(name);
}
console.log(walkFrames)
let HERO_SPEED = 200
const JUMP_POWER = 480
const GHOST_SPEED = 100



let level_id = 0
let kills = 0

let ghost_blocks = 0

let start_time = 0

scene('game', ({ level_id, kills, ghost_blocks }) => {

    if (level_id == 0) {
        start_time = time()
    }
    camScale(3)

    current_map = maps[level_id]

    const level_config = {
        width: 16,
        height: 16,

        '=': () => [
            sprite('mid-grass'),
            'block',
            area(),
            solid(),
        ],
        ';': () => [
            sprite('lft-grass'),
            'block',
            area(),
            solid(),
        ],
        ':': () => [
            sprite('rt-grass'),
            'block',
            area(),
            solid(),
        ],
        '|': () => [
            sprite('lft-top-corner-grass'),
            'block',
            area(),
            solid(),
        ],

        '[': () => [
            sprite('rt-top-corner-grass'),
            'block',
            area(),
            solid(),
        ],
        '#': () => [
            sprite('lft-side-dirt'),
            'block',
            area(),
            solid(),
        ],
        ']': () => [
            sprite('rt-side-dirt'),
            'block',
            area(),
            solid(),
        ],
        '-': () => [
            sprite('dirt'),
            'block',
            area(),
            solid(),
        ],
        '~': () => [
            sprite('top-grass'),
            'block',
            area(),
            solid(),
        ],

        '&': () => [
            sprite('mid-snow-grass'),
            'block',
            area(),
            solid(),
        ],
        '$': () => [
            sprite('lft-snow-grass'),
            'block',
            area(),
            solid(),
        ],
        '0': () => [
            sprite('rt-snow-grass'),
            'block',
            area(),
            solid(),
        ],
        '@': () => [
            sprite('lft-top-corner-snow-grass'),
            'block',
            area(),
            solid(),
        ],

        ')': () => [
            sprite('rt-top-corner-snow-grass'),
            'block',
            area(),
            solid(),
        ],
        '_': () => [
            sprite('top-snow-grass'),
            'block',
            area(),
            solid(),
        ],
        '#': () => [
            sprite('lft-side-dirt'),
            'block',
            area(),
            solid(),
        ],
        ']': () => [
            sprite('rt-side-dirt'),
            'block',
            area(),
            solid(),
        ],
        '-': () => [
            sprite('dirt'),
            'block',
            area(),
            solid(),
        ],
        '~': () => [
            sprite('top-grass'),
            'block',
            area(),
            solid(),
        ],
        '1': () => [
            sprite('grass'),
            'block',
            area(),
            solid(),
        ],
        '2': () => [
            sprite('snow-grass'),
            'block',
            area(),
            solid(),
        ],
        '^': () => [
            sprite('spike'),
            'spike',
            area(),

        ],
        'C': () => [
            sprite("checkpoint"),
            
            area(),
            "checkpoint",
        ],
        'I': () => [
            sprite("ice"), // Use sprite, or use a color rect if no sprite
                scale(0.5),
                area(),         // For collision
                solid(),        // So player can stand on it
                "ice",
        ],
        '*': () => [
            
            'ghosty',
            'enemy',
            
            color(138, 138, 138),
            
            rect(8,8),
            outline(1),
            area(8),
            
            
            move(LEFT, 200),
            {
                speed: 200
            },
            ],
            'L': () => [
                sprite('portal'),
                'portal',
                area(),
            ],
            '8': () => [
                sprite('snowman'),
            ],
            'D': () => [
                sprite('diamond'),
                area(),
                'diamond'
            ],
            'Y': () => [
                sprite('yeti'),
                'yeti',
                area(),
                body(),
            ]

        }
    const facts = [
        'There are around 600,000 emperor penguins in the wild', 'There are fewer than 19,800 African penguins in the wild', 'There are over 10 million Adélie penguins', "There are 1.6 million royal penguins", "3.2 to 4.4 million king penguins", '23,800 mature individuals of Humboldt penguins', '2,684 - 3,064 yellow-eyed penguins', 'There are 8 million mature individuals of chinstrap penguins', 'Only 3,000-8,000 Galapagos penguins', 'Around 774K population of gentoo penguins','Around 774K population of gentoo penguins', '469,760 little penguins', '3,200,000 Magellanic penguins', '150,000 erect-crested penguin', '63,000 Snare penguins', 'Macaroni penguins are the penguins with the largest population with an astonishing 18 million', 'There are 12,500 - 50,000 mature individuals of the Fiordland penguin', 'Rockhopper Northern: 413,700 Southern:2,500,000', 'Penguins can propel their streamlined bodies up to 35 miles an hour', "The emperor penguin's black body with white belly camouflages it above and below in the water.", "The Galapagos penguins are the only penguin species found north of the equator.", "When it's chilly, penguins huddle together for warmth, taking turns rotating to the cozy center so everyone stays toasty at around 37.5 degrees Celsius!", "The top of a macaroni penguin is yellow hence the name macaroni", "Fairy blue penguins are the smallest penguins", "Male penguins gift females rocks to make a nest", "Penguins are one of the most streamlined animals in the world", "On land, they stand upright and waddle or run. When in a hurry, they can switch to ‘tobogganing’ by lying on their stomach and using their flippers to propel, steer, and brake.", "If a penguin loses an egg, they can steal it from some other bird", "The emperor penguin is the largest, standing 112 cm (44 in) tall. The smallest penguin is the fairy penguin, standing just 41 cm (16 in).", "Good Luck :) There are a total of 18 species Animal family: Diomedeidae Diet: Carnivore Life span: more than 70 years Wing span: 195 to 335 cm Weight: up to 10kg Group name: flock Domain: Eukaryota Genus: Eudyptes, Spheniscus, Pygoscelis, Aptenodytes, Megadyptes emperor – Aptenodytes forsteri king – Aptenodytes patagonica Adélie – Pygoscelis adeliae Gentoo – Pygoscelis papua chinstrap – Pygoscelis antarcticus Northern rockhopper – Eudyptes moseleyi southern rockhopper – Eudyptes Chrysostom macaroni – Eudyptes chrysolophus royal – Eudyptes schlegeli  Fiordland crested – Eudyptes pachyrhynchus erect-crested – Eudyptes sclateri Snares Island – Eudyptes robustus yellow-eyed – Megadyptes antipodes fairy (little blue) – Eudyptula minor Magellanic – Spheniscus magellanicus Humboldt – Spheniscus humboldti African – Spheniscus demersus Galapagos – Spheniscus mendiculus", "The Galapagos penguin is the only penguin species found north of the equator.", "Penguins can dive up to 650 feet deep.", "Penguins among all the species are primarily found in Angola, Antarctica, Argentina, Australia, Chile, Namibia, New Zealand, Galapous Island and South Africa", "Galapagos and Snares penguins are named after the island respectively"
]
    
    let randomFact = 0
    function generateRandomNumber() {
        const randomNum = Math.floor(rand(0, facts.length)); // Random number between 1 and 99
        randomFact = randomNum
    }
    const blocks_label = add([
        text('hi')
    ])
    // Run every 3 seconds
    loop(3, generateRandomNumber);
    
    const level_label = add([
        text('Level ' + level_id),
        pos(0, 0),
        scale(.2),
        
        fixed(),
    ])
    const fact_label = add([
        text(facts[randomFact], {
            size: 24,
            width: 1200,
        }),
        pos(250, 20),
        //scale(.25),
        fixed(),
    ])
    const scoreLabel = add([
        text('score ' + score),
        pos(0, 70),
        scale(.2),
        fixed(),
        {
            update() {
                this.text = "score: " + score
            }
        }
        ])
        

    const hero = add([
        sprite(walkFrames[0]),
        pos(lastCheckpoint),
        area(),
        body(),
        scale(1),
        {
            isInvincible: false,
            hp: 3, // starting HP
            stunned: false,
            slipping: false,
            vel: vec2(0, 0),
            isOnIce: false,
        },
        'player'

    ])
    /*const hpLabel = add([
        text("HP: " + hero.hp),
        pos(10, 10),
        fixed(),
        scale(0.5),
        layer("ui"),
        {
            update() {
                this.text = "HP: " + hero.hp;
            }
        }
    ]);*/
    const heartIcons = []
    function drawHearts() {
        // Clear old hearts
        heartIcons.forEach(h => destroy(h))
        heartIcons.length = 0
    
        for (let i = 0; i < hero.hp; i++) {
            const heart = add([
                sprite("heart"),
                pos(10 + i * 40, 10),
                scale(3),
                fixed(),
                layer("ui"),
            ])
            heartIcons.push(heart)
        }
    }
    drawHearts()
    hero.onCollide("checkpoint", (c) => {
        lastCheckpoint = c.pos.clone();
        debug.log("Checkpoint reached!");
    });
    hero.onCollide("diamond", (d) => {
        d.destroy()
        score++
    })
    
    onUpdate(() => {
        if (isKeyDown("right") || isKeyDown("left")) {
            frameTimer += dt()
            if (frameTimer >= frameInterval) {
                frameTimer = 0
                currentFrame = (currentFrame + 1) % walkFrames.length
                hero.use(sprite(walkFrames[currentFrame]))
            }
        } else {
            currentFrame = 0
            hero.use(sprite(walkFrames[currentFrame]))
        }

        if (!hero.stunned) {
            if (isKeyDown("right")){
                hero.move(HERO_SPEED, 0)
            }


            if (isKeyDown("left")) {

                hero.move(-HERO_SPEED, 0)
                hero.flipX(true)

            }
        }
    })
    onUpdate(() => {
    if (hero.isColliding('ice')) {
        HERO_SPEED = 400

    }
    if (!hero.isColliding('ice')) {
        HERO_SPEED = 200
    }
    })
    
    
    onKeyDown('space', () => {
        if (hero.isGrounded("block")) { 
            hero.jump(JUMP_POWER)
        }
    })

    onKeyDown('up', () => {
        if (hero.isGrounded()) {
            hero.jump(JUMP_POWER)
        }
    })
    
    function takeDamage(hero, source) {
        if (hero.isInvincible) return;
    
        console.log("Player took damage!");
        hero.hp--;
        drawHearts()
        hero.isInvincible = true;
        const knockbackStrength = 3000;
        const knockbackY = 200;
        const direction = hero.pos.sub(source.pos).unit();
        hero.move(direction.x * knockbackStrength, -knockbackY);
        let flickerTimer = 0;

        const flickerAction = hero.onUpdate(() => {
            flickerTimer += dt();
            if (flickerTimer >= 0.1) {
                hero.hidden = !hero.hidden;
                flickerTimer = 0;
            }
        });

        wait(1, () => {
            hero.isInvincible = false;
            flickerAction();
            hero.hidden = false;
        });
    }
    hero.collides('enemy', (enemy) => {
        if (enemy.pos.y < hero.pos.y) {
            
        } else {
            play("hit")
            kills++
            blocks_label.text = 'blocks '
            enemy.destroy()
            hero.jump(100)
            hero.hp++
            drawHearts()
        }
    })
    hero.onCollide("spike", (spike) => {

        takeDamage(hero,spike)
        if (hero.hp < 0 || hero.hp === 0) {
            hero.hp = 3
            drawHearts()
            hero.pos = lastCheckpoint.clone();
            hero.vel = vec2(0, 0);
        }
    })

    hero.collides('portal', (p) => {
        p.destroy()
        level_id++
        if (level_id < maps.length) {
            lastCheckpoint = vec2(30, 0)
            go('game', { level_id, kills, ghost_blocks, start_time, })
            
        }
        else {
            go('win', { start_time })
        }
    })

    

    
    hero.onUpdate(() => {
        camPos(hero.pos)
        if (hero.pos.y > 2000) {
            if(hero.hp < 0 || hero.hp === 0){
                
                hero.hp = 3
                drawHearts()
                hero.pos = lastCheckpoint.clone();
                hero.vel = vec2(0, 0);
            } else {
                hero.pos = lastCheckpoint.clone();
                hero.vel = vec2(0, 0);
                debug.log("Respawned at checkpoint!");
                hero.hp--;
                drawHearts()
            }
            
        }
    })
    onUpdate('ghosty', (g) => {
        g.move(g.speed, 0)

        if (g.pos.x > 1500 || g.pos.x < -100) {
            g.speed = g.speed * -1
        }
    })

    onClick((click_pos) => {
        let world_pos = toWorld(click_pos)
        if (ghost_blocks > 0) {
            ghost_blocks--
            blocks_label.text = 'blocks ' + ghost_blocks
            add([
                sprite('ghost_block'),
                'ghost_block',
                'block',
                pos(world_pos),
                area(),
                solid(),
            ])
        }
    })

    onKeyPress('b', () => {
        if (ghost_blocks > 0) {
            ghost_blocks--
            blocks_label.text = 'blocks ' + ghost_blocks
            add([
                sprite('ghost_block'),
                'ghost_block',
                'block',
                pos(hero.pos.x, hero.pos.y + 5),
                area(),
                solid(),
            ])
        }
    })

    const game_level = addLevel(current_map, level_config)
    const level = game_level
})

scene('lose', () => {
    add([
        text('You Lose!'),
        color(255, 0, 0),
        origin('center'),
        pos(width() / 2, height() / 2)
    ])

    onKeyPress(() => {
        go('game', {
            level_id,
            kills,
            ghost_blocks,
            start_time
        })
        
    })
})

scene('win', ({ start_time }) => {
    add([
        text('You Win!' + "\nTime: " + (time() - start_time).toFixed(2) + "\nScore: " + score),
        color(0, 255, 0),
        origin('center'),
        pos(width() / 2, height() / 2)
    ])

    onKeyPress(() => {
        go('game', {
            level_id: 0,
            kills: 0,
            ghost_blocks: 0,
            score:0,
            start_time: 0
        })
        lastCheckpoint = vec2(30, 0)
    })
})

go('game', { level_id: 0, kills: 0, ghost_blocks: 0, score:0, start_time: 0})