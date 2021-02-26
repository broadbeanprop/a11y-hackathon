function Nav() {
    const SCROLL_DURATION = 1000;
    const distanceToScroll = window.screen.height;

    function scrollDown() {
        const y = document.documentElement.scrollTop;
        doScrolling(y + distanceToScroll, SCROLL_DURATION);
    }

    function scrollUp() {
        const y = document.documentElement.scrollTop;
        doScrolling(y - distanceToScroll, SCROLL_DURATION);
    }

    // https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page/20670662
    function doScrolling(elementY, duration) {
      var startingY = window.pageYOffset;
      var diff = elementY - startingY;
      var start;

      // Bootstrap our animation - it will get called right before next frame shall be rendered.
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        // Elapsed milliseconds since start of scrolling.
        var time = timestamp - start;
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1);

        window.scrollTo(0, startingY + diff * percent);

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
          window.requestAnimationFrame(step);
        }
      })
    }

    return (
        <nav>
            <header className="visually-hidden">
                <h3>Main navigation</h3>
            </header>
            <img className="logo" src="https://test-static.videoland.com/static/101199/images/vl-logo.svg" alt="Videoland" />

            {/*
            <ul className="pull-right inline-list unlist">
                <li>
                    <span className="icon icon-search">
                        <span className="visually-hidden">Zoeken</span>
                    </span>
                </li>

                <li>
                    <span className="icon icon-list">
                        <span className="visually-hidden">Mijn kijklijst</span>
                    </span>
                </li>

                <li>
                    <span className="icon icon-account">
                        <span className="visually-hidden">Account</span>
                    </span>
                </li>
              </ul>
              */}

            <div className="gazing-scroll-up gazing-click-region" onClick={scrollUp}></div>
            <div className="gazing-scroll-down gazing-click-region" onClick={scrollDown}></div>
        </nav>
    );
}

export default Nav;
