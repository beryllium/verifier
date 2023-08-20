document.addEventListener('DOMContentLoaded', function () {
    let contentArea = document.querySelector('div#queryParams');
    let input = new URL(window.location.href);
    let encoder = document.createElement('textarea');

    let params = [];

    for (const[key, value] of input.searchParams.entries()) {
        params.push([key, value]);
    }

    params.sort(
        function (a, b) {
            if (a[0] == 'oauth_verifier') {
                return -1;
            }
            if (b[0] == 'oauth_verifier') {
                return 1;
            }

            return (a>b?1:(a<b?-1:0));
        }
    );

    for (const [key, value] of params) {
        document.querySelector('div#queryParams > div#tmpMsg').setAttribute('style', 'display: none');
        var template = document.createElement('div');
        template.setAttribute('class', 'mb-10 place-content-center content-center items-center');
        
        encoder.innerText = key;
        let safeKey = encoder.innerHTML;

        encoder.innerText = value;
        let safeValue = encoder.innerHTML;

        template.innerHTML = '' +
            '<div class="border rounded bg-white border-black px-6 md:px-16 py-6 max-w-xl">' +
            '<h2 class="text-2xl font-serif font-bold mb-4 text-center">?' + safeKey + '=</h2>' +
            '<p class="queryValue bg-gray-300 font-mono font-medium text-lg px-2 py-1 border border-slate-400 text-gray-500 rounded">' + safeValue + '</p>' +
            '<button class="copy border rounded rounded-lg px-3 py-1 bg-cyan-200 hover:bg-cyan-400 shadow-inner hover:shadow mt-5">COPY</button>' +
            '</div>' +
            '';

        contentArea.appendChild(template);
    }

    let copyButtons = document.querySelectorAll('button.copy');
    for (button of copyButtons) {
        button.addEventListener('click', function (ev) {
            let copyableText = ev.target.parentNode.querySelector('p.queryValue').textContent;
            let encoder = document.createElement('textarea');

            encoder.innerText = copyableText;
            let safeText = encoder.innerHTML;
            if (safeText.length == 0) {
                console.log('Nothing to copy ...');
                return;
            }
            
            navigator.clipboard.writeText(safeText).then(
                () => { console.log('success'); document.querySelectorAll('button.copy').forEach((el) => {el.textContent = 'COPY';}); ev.target.textContent = 'Copied!' },
                () => { console.log('failure'); document.querySelectorAll('button.copy').forEach((el) => {el.textContent = 'COPY';}); ev.target.textContent = 'Failed to copy'},
            );
        });
    }
});