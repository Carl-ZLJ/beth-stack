import * as elements from 'typed-html';

export const BaseHTML = ({ children }: elements.Children) => {
    return `
        <!DOCTYPE html>
        <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
                <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
                <title>The BETH Stack</title>
            </head>
            <body>
                ${children}
            </body>
        </html>
    `;
};
