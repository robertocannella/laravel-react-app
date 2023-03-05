export class ThemeSwitcher{
    private readonly checkbox: HTMLInputElement | null;


    constructor() {
        /* get elements */

        this.checkbox = document.querySelector('input[name=mode]')

        this.events = this.events.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.trans = this.trans.bind(this);
        this.events();

    }
    events(){

        this.checkbox?.addEventListener('change',this.changeTheme);
    }

    changeTheme(){
        console.log("runninxd")
        if (this.checkbox?.checked)
            document.documentElement.setAttribute('data-theme', 'dark');
        else
            document.documentElement.setAttribute('data-theme', 'light');
        this.trans();

    }
    trans(){
        console.log("Vite")
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000)
    }
}



