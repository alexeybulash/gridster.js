/**
 * resolves positioning relations between rectangles 'a' and 'b'
 */
var CollisionUtils = {
    overlaps : function(a, b){
        var x = false;
        var y = false;

        if ((b.x1 >= a.x1 && b.x1 <= a.x2) ||
            (b.x2 >= a.x1 && b.x2 <= a.x2) ||
            (a.x1 >= b.x1 && a.x2 <= b.x2)
        ) { x = true; }

        if ((b.y1 >= a.y1 && b.y1 <= a.y2) ||
            (b.y2 >= a.y1 && b.y2 <= a.y2) ||
            (a.y1 >= b.y1 && a.y2 <= b.y2)
        ) { y = true; }

        return (x && y);
    },

    detect_overlapping_region : function(a, b){
        var regionX = '';
        var regionY = '';
        var height = 0;
        var width = 0;

        a.cx = a.x1 + (a.x2 - a.x1) / 2;
        a.cy = a.y1 + (a.y2 - a.y1) / 2;
        b.cx = b.x1 + (b.x2 - b.x1) / 2;
        b.cy = b.y1 + (b.y2 - b.y1) / 2;

        switch (true) {
        case (a.y1 >= b.cy && a.y1 <= b.y2):
            regionY = 'N';
            height = b.y2 - a.y1 + 1;
            break;
        case (a.y2 >= b.y1 && a.y2 <= b.cy):
            regionY = 'S';
            height = a.y2 - b.y1 + 1;
            break;
        default:
            regionY = 'C';
            height = a.y2 - b.y1 + 1;
        }

        switch (true) {
        case (a.x1 >= b.cx && a.x1 <= b.x2):
            regionX = 'W';
            width = b.x2 - a.x1 + 1;
            break;
        case (a.x2 >= b.x1 && a.x2 <= b.cx):
            regionX = 'E';
            width = a.x2 - b.x1 + 1;
            break;
        default:
            regionX = 'C';
            width = a.x2 - b.x1 + 1;
        }

        return {
            'region' : regionY + regionX,
            'width'  : width,
            'height' : height
        };
    },

    /**
     * Checks if 'a' is above 'b'
     */
    is_above : function(a, b){
        if (a.y2 < b.y1 &&
            (
                (a.x1 >= b.x1 && a.x1 <= b.x2) ||
                (a.x2 >= b.x1 && a.x2 <= b.x2)
            )
        ) { return true; }

        return false;
    },

    /**
     * Checks if 'a' is below 'b'
     */
    is_below : function(a, b){
        return this.is_above(b, a);
    }
};
