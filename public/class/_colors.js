// _Colors.js

export class _Colors {

    GetColors() {
        return [
            'dodgerblue',
            'mediumseagreen',
            'red',
            'orange',
            'darkgray',
            'purple'
        ]
    }

    GetRandomColor() {
        return this.GetColors()[Math.floor(Math.random()*this.GetColors().length)]
    }
}