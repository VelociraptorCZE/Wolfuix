/**
 * WolfuixGraph
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class WolfuixGraph {
    constructor(props) {
        this.props = props instanceof Object ? props : {};
        this.canvas = {};
        this.newCanvas = props.target || props.element;
    }

    set newCanvas(elem) {
        const el = document.getElementById(elem);
        this.canvas = {
            elem: el,
            context: el.getContext("2d")
        }
    }

    drawGraph(data) {
        const { canvas } = this;
        this.data = data;
        let angle = 0;
        canvas.context.lineWidth = this.props.lineWidth;
        data.parts.forEach(part => {
            const temporaryAngle = angle + part.percent;
            canvas.context.strokeStyle = part.color ? part.color : "#000";
            canvas.context.beginPath();
            canvas.context.arc(data.x, data.y, data.radius, WolfuixGraph.getAngle(angle), WolfuixGraph.getAngle(temporaryAngle));
            canvas.context.stroke();
            canvas.context.closePath();
            angle = temporaryAngle;
        });
        this._drawOutline();
    }

    static getAngle(a) {
        return a / 50 * Math.PI;
    }

    _drawOutline({ canvas, props, data } = this) {
        if (props.outline) {
            canvas.context.lineWidth = props.outline.width;
            canvas.context.strokeStyle = props.outline.color;
            const particularOutline = (upper) => {
                canvas.context.beginPath();
                canvas.context.arc(data.x, data.y,data.radius + (props.lineWidth / 2 * (upper ? 1 : -1)), 0, 2 * Math.PI);
                canvas.context.stroke();
                canvas.context.closePath();
            };
            particularOutline();
            particularOutline(true);
        }
    }
}