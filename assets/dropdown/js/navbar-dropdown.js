(function() {
    function handleScrollResize(event) {
        if (event.type === 'resize') {
            document.body.classList.remove('navbar-dropdown-open');
            document.querySelector('.navbar-dropdown').querySelector('.navbar-collapse').classList.remove('show');
            document.querySelector('.navbar-dropdown').classList.remove('opened');
            Array.from(document.querySelector('.navbar-dropdown').querySelectorAll('.navbar-toggler[aria-expanded="true"]')).forEach(function(toggler) {
                var target = document.querySelector(toggler.getAttribute('data-target'));
                if (target) {
                    target.classList.remove('show');
                    target.setAttribute('aria-expanded', 'false');
                    toggler.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        Array.from(document.querySelectorAll('.navbar-dropdown')).forEach(function(dropdown) {
            if (dropdown.matches('.navbar-fixed-top')) {
                if (dropdown.matches('.transparent') && !dropdown.classList.contains('opened')) {
                    if (scrollTop > 0) {
                        dropdown.classList.remove('bg-color');
                    } else {
                        dropdown.classList.add('bg-color');
                    }
                }
                if (scrollTop > 0) {
                    dropdown.classList.add('navbar-short');
                } else {
                    dropdown.classList.remove('navbar-short');
                }
            }
        });
    }
    
    var resizeTimeout;
    ['scroll', 'resize'].forEach(function(eventType) {
        document.addEventListener(eventType, function(event) {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                handleScrollResize(event);
            }, 10);
        });
    });
    
    ['show.bs.collapse', 'hide.bs.collapse'].forEach(function(eventType) {
        document.addEventListener(eventType, function(event) {
            var targetDropdown = event.target.closest('.navbar-dropdown');
            if (targetDropdown) {
                if (eventType === 'show.bs.collapse') {
                    document.body.classList.add('navbar-dropdown-open');
                    targetDropdown.classList.add('opened');
                } else {
                    document.body.classList.remove('navbar-dropdown-open');
                    targetDropdown.classList.remove('opened');
                    window.dispatchEvent(new Event('scroll.bs.navbar-dropdown.data-api'));
                    targetDropdown.dispatchEvent(new Event('collapse.bs.navbar-dropdown'));
                }
            }
        });
    });
    
    document.querySelector('html').classList.contains('is-builder') || document.addEventListener('click', function(event) {
        var target = event.target;
        if (!target.classList.contains('nav-link') && !target.parentNode.classList.contains('nav-link')) {
            var collapseElement = document.querySelector('#navbarSupportedContent');
            var dropdownElement = document.querySelector('.navbar-dropdown');
            var isNavMenuShown = collapseElement.classList.contains('show');
            var isDropdownCollapsed = dropdownElement.classList.contains('collapsed');
            if ((window.matchMedia('(max-width: 991px)').matches || isDropdownCollapsed) && (isNavMenuShown && !target.closest('.navbar-collapse') || target.closest('.nav-item a:not(.dropdown-toggle)'))) {
                new bootstrap.Collapse(collapseElement);
            }
        }
    });
    
    document.addEventListener('collapse.bs.nav-dropdown', function(event) {
        var relatedDropdown = event.relatedTarget.closest('.navbar-dropdown');
        if (relatedDropdown) {
            var toggler = relatedDropdown.querySelector('.navbar-toggler[aria-expanded="true"]');
            if (toggler) {
                toggler.dispatchEvent(new Event('click'));
            }
        }
    });
    
    document.querySelectorAll('.nav-link.dropdown-toggle').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            link.parentNode.classList.toggle('open');
        });
    });
})();
