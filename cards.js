(function() {
    let initialized = false;

    function uniqueCreateMarketOverviewExtensionV3() {
        console.log('Attempting to initialize Market Overview Extension...');

        const updateThemeClasses = () => {
            const isNight = document.body.classList.contains('NIGHT');
            const pElements = document.querySelectorAll('.card-info-p');
            pElements.forEach(p => {
                p.classList.remove('etDiuO', 'kKpPOn');
                if (isNight) {
                    p.classList.add('etDiuO');
                } else {
                    p.classList.add('kKpPOn');
                }
            });
        };

        const updateMarketOverview = () => {
            if (initialized) {
                console.log('Market Overview Extension already initialized. Skipping...');
                return;
            }

            const targetDiv = document.querySelector('.jSZydc .sc-1a5c8bdf-0.dyzKpp .sc-1a5c8bdf-1.aZNqQ');
            if (targetDiv) {
                console.log('Target div found. Proceeding with updates...');
                initialized = true;
                targetDiv.style.display = 'none';

                const newDiv = document.createElement('div');
                newDiv.className = 'sc-1a5c8bdf-1 aZNqQ';
                newDiv.innerHTML = `
                    <div>
                        <div class="sc-61710cb6-0 fyYcGd">
                            <div class="card-title">
                                <span class="card-title-icon">🪐</span>
                                <span class="card-title-text">Market Overview</span>
                            </div>
                            <a href="/charts">
                                <span>More</span>
                            </a>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-1">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                                <span class="card-change-span"></span>
                            </div>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-2">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                                <span class="card-change-span"></span>
                            </div>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-3">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                            </div>
                        </div>
                    </div>`;

                targetDiv.parentNode.insertBefore(newDiv, targetDiv.nextSibling);
                updateThemeClasses();

                const globalHeader = document.querySelector('div[data-role="global-header"]');
                const statItems = globalHeader.querySelectorAll('.glo-stat-item');
                const cards = newDiv.querySelectorAll('.sc-c50d2aab-13.kilDhP');

                [2, 3, 4].forEach((index, i) => {
                    if (statItems[index]) {
                        const text = statItems[index].querySelector('.sc-f70bb44c-0.jNqpFI.base-text').innerText;
                        let data, percentageChange, svgHtml = '';
                        const directA = statItems[index].querySelector('a');
                        const divWrappedA = statItems[index].querySelector('.sc-59e437b5-2.hRcdAX a');
                        const percentageSpan = statItems[index].querySelector('.sc-59e437b5-3.dWZjJC');
                        const svgElement = statItems[index].querySelector('.sc-59e437b5-2.hRcdAX svg');
                        
                        if (directA && !divWrappedA) {
                            data = directA.innerText;
                        } else if (divWrappedA) {
                            data = divWrappedA.innerText;
                        }
                        if (svgElement) {
                            svgHtml = svgElement.outerHTML; // Capture the SVG HTML
                        }
                        if (percentageSpan) {
                            percentageChange = percentageSpan.outerHTML;
                        }

                        if (data) {
                            cards[i].querySelector('.card-info-p').innerText = text;
                            cards[i].querySelector('.card-data-span').innerText = data;
                            if (percentageChange && i < 2) { // Only for Market Cap and 24H Volume
                                cards[i].querySelector('.card-change-span').innerHTML = svgHtml + percentageChange; // Include SVG in the output
                            }
                        }
                    }
                });

                const themeObserver = new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.attributeName === 'class') {
                            updateThemeClasses();
                        }
                    });
                });
                themeObserver.observe(document.body, { attributes: true });

                observer.disconnect();
            } else {
                console.log('Target div not found. Retry in 500ms...');
                setTimeout(updateMarketOverview, 500);
            }
        };

        const observer = new MutationObserver((mutations) => {
            updateMarketOverview();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    uniqueCreateMarketOverviewExtensionV3();
})();