// check for different forms
import defaultSpritesNames from '@/components/assets/defaultSpriteNames.json';

// names to get home default sprites
function getDefaultSpriteName(name) {
    defaultSpritesNames.pokemon_names.forEach(element => {
        if (name == element.pokemon_name) {
            name = element.default_sprite_name;
        }
    });
    return name;
}

export { getDefaultSpriteName };
