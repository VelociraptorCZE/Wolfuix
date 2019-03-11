/**
 * WolfuixGraph
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class WolfuixGraph {
    constructor(props) {
        this.props = props instanceof Object ? props : {};
        if (!this.props.lineWidth) this.props.lineWidth = 25;
        this.newCanvas = props.target || props.element;
    }

    set newCanvas(elem) {
        this.context = document.getElementById(elem).getContext("2d");
    }

    drawGraph(data) {
        const { context } = this;
        this.data = data;
        this.data.radius = !isFinite(data.radius) ? 50 : data.radius;
        let angle = 0;
        context.lineWidth = this.props.lineWidth;
        data.parts.forEach(part => {
            const temporaryAngle = angle + part.percent;
            context.strokeStyle = part.color ? part.color : "#000";
            context.beginPath();
            context.arc(data.x, data.y, data.radius, WolfuixGraph.getAngle(angle), WolfuixGraph.getAngle(temporaryAngle));
            context.stroke();
            context.closePath();
            angle = temporaryAngle;
        });
        this._drawOutline();
    }

    static getAngle(a) {
        return a / 50 * Math.PI;
    }

    _drawOutline({ context, props, data } = this) {
        if (props.outline) {
            context.lineWidth = props.outline.width;
            context.strokeStyle = props.outline.color;
            const particularOutline = upper => {
                context.beginPath();
                context.arc(data.x, data.y,data.radius + (props.lineWidth / 2 * (upper ? 1 : -1)), 0, 2 * Math.PI);
                context.stroke();
                context.closePath();
            };
            particularOutline();
            particularOutline(true);
        }
    }
}