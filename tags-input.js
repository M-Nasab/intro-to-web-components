class TagsInputElement extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({ mode: 'open' });

        this.tags = [
            'Physics',
            'Astronomy',
            'Cosmology',
        ];
    }

    connectedCallback () {
        this.render();
    }

    render () {
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            :host {
                padding: 10px;
                background-color: #03a9f4;
                border-radius: 20px;
            }

            button {
                background: none;
                border: none;
                background-color: #f44336;
                padding: 10px;
                border-radius: 10px;
                color: antiquewhite;
                font-weight: bold;
                cursor: pointer;
                margin: 0 5px;
            }

            .input-container {
                display: inline;
            }
        </style>
        <div class="input-container">
            <input>
        </div>
        `;

        const content = document.importNode(template.content, true);

        const inputContainerElement = content.querySelector('.input-container');

        const inputElement = content.querySelector('input');

        inputElement.placeholder = this.getAttribute('placeholder');

        inputElement.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                const value = e.target.value;

                if (value) {
                    const inputContainerElement = this.shadowRoot.querySelector('.input-container');
                    this.tags.push(value);
                    const tagElement = this.createTagElement(value);
                    this.shadowRoot.insertBefore(tagElement, inputContainerElement);

                    e.target.value = "";
                }
            }
        });

        inputElement.addEventListener('keydown', (e) => {
            const value = e.target.value;
            if (e.keyCode === 8 && !value) {
                const tags = this.shadowRoot.querySelectorAll('button');
                const lastTag = tags.length && tags[tags.length - 1];

                if (lastTag) {
                    this.shadowRoot.removeChild(lastTag);
                }
            }
        });

        this.tags.forEach((tag) => {
            const tagElement = this.createTagElement(tag);
            content.insertBefore(tagElement, inputContainerElement);
        });

        this.shadowRoot.appendChild(content);
    }

    createTagElement (tag) {
        const tagElement = document.createElement('button');

        tagElement.innerHTML = tag;

        tagElement.addEventListener('click', (e) => {
            const tagIndex = this.tags.findIndex((t) => {
                return tag === t;
            });

            if (tagIndex !== -1) {
                this.tags.splice(tagIndex, 1);
            }

            this.shadowRoot.removeChild(tagElement);
        });

        return tagElement;
    }
}

customElements.define('tags-input', TagsInputElement);