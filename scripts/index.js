document.addEventListener('DOMContentLoaded', event => {

    const navPanelToggler = document.querySelector('.burger-button')
    const navPanel = document.querySelector('.nav-panel')
    const projectImages = document.querySelectorAll('.project-image')
    const submitButton = document.getElementById('submit-button')

    const navPanelAdapt = () => {
        const navButtons = document.querySelectorAll('.nav-button')
        const backlights = document.querySelectorAll('.button-backlight')
        const navLinks = document.querySelectorAll('.nav-link')
        const sections = document.querySelectorAll('section')

        // Поднятие навигационной панели
        if(window.scrollY === 0 && navPanelToggler.getAttribute('aria-expanded') === 'false') {
            navPanel.classList.remove('nav-panel_detached')
        } else {
            navPanel.classList.add('nav-panel_detached')
        }

        // Подсветка кнопок меню, в зависимости от секции.
        sections.forEach(section => {

            const removeActive = () => {

                navButtons.forEach(button => {
                    button.classList.remove('nav-button_active')
                })
                backlights.forEach(light => {
                    light.classList.remove('button-backlight_on')
                })
            }
            

            if (window.scrollY < (section.offsetTop - 120) && section.id === 'about') {
                // Убрать все активные кнопки, при возврате к самому верху страницы.
                // В противном случае кнопка "Обо мне" будет подсвечивать не свою секцию.
                removeActive()
            } else if (window.scrollY >= (section.offsetTop - 120)) {
                
                removeActive()
                navLinks.forEach(link => {
                    const linkId = link.href.slice(link.href.indexOf('#') + 1, link.href.indexOf('-'))
                    
                    if(linkId === section.id) {
                        link.querySelector('.nav-button').classList.add('nav-button_active')
                        link.querySelector('.button-backlight').classList.add('button-backlight_on')
                    }
                })
            }
        })
    }

    // Работа навигационной панели в мобильном режиме
    const navPanelOpen = () => {
        

        if(window.scrollY === 0 && !navPanel.classList.contains('nav-panel_detached')) {
            navPanel.classList.add('nav-panel_detached')
        }

        navPanel.classList.add('nav-panel_active', 'inprogress')

        setTimeout(() => {
            navPanel.classList.add('nav-panel_opened')
        }, 300)

        setTimeout(() => {
            navPanel.classList.remove('inprogress')
            navPanelToggler.setAttribute('aria-expanded', 'true')
        }, 1100)
    }

    const navPanelClose = () => {

        navPanel.classList.remove('nav-panel_opened')
        navPanel.classList.add('inprogress')

        setTimeout(() => {
            navPanel.classList.remove('nav-panel_active')
        }, 300)

        setTimeout(() => {
            navPanel.classList.remove('inprogress')
            navPanelToggler.setAttribute('aria-expanded', 'false')

            if(window.scrollY === 0 && navPanel.classList.contains('nav-panel_detached')) {
            navPanel.classList.remove('nav-panel_detached')
        }
        }, 500)
    }
    

    const animation = () => {

        const offset = element => {
            const rect = element.getBoundingClientRect()
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }

        const animateItems = document.querySelectorAll('.animate')

        if (animateItems.length > 0) {
            const onEntry = () => {
                animateItems.forEach(item => {
                    const itemHeight = item.offsetHeight
                    const itemOffset = offset(item).top
                    const startPosition = 2
                    const screenHeight = document.documentElement.clientHeight
                    const screemWidth = document.documentElement.clientWidth
                    const noHide = item.classList.contains('no-hide')

                    let animatePoint = screenHeight - itemHeight / startPosition

                    if(noHide && screemWidth > 991) {
                        animatePoint = screenHeight - itemHeight
                    }

                    if(itemHeight > screenHeight) {
                        animatePoint = screenHeight - screenHeight / startPosition
                    }

                    if ((scrollY > itemOffset - animatePoint) && screenY < itemOffset + itemHeight) {
                        item.classList.add('show')
                    } else {
                        if(!noHide) {
                            item.classList.remove('show')
                        }
                    }
                })
            }
            onEntry()
        }
    }

    navPanelAdapt()
    animation()
    
    window.addEventListener('scroll', () => {
        navPanelAdapt()
        animation()
    })

    window.addEventListener('resize', () => {
        navPanelAdapt()
        animation()
    })

    navPanelToggler.addEventListener('click', (event) => {
        // Переключатель навигационной панели. Развернуть / Свернуть.
        event.stopPropagation()

        if(navPanel.classList.contains('inprogress')) {
            // Предотвращение срабатывания во время работы анимации.
            return

        }

        const isExpanded = navPanelToggler.getAttribute('aria-expanded')
        if(isExpanded === 'false') {
            navPanelOpen()
        } else if(isExpanded === 'true') {
            navPanelClose()
        }
    })

    projectImages.forEach((image) => {
        // Модальное окно для отображения увеличенного изображения.
        image.addEventListener('click', function (event) {
            const targetImage = getComputedStyle(event.target).backgroundImage.slice(-20, -2)
            const modalOverlay = document.querySelector('.modal__overlay')
            const crossButton = document.querySelector('.cross-button')
            const imageBlock = document.querySelector('.modal__project-image')
            const modal = document.querySelector('.modal')

            modalOverlay.classList.add('turned-on')
            imageBlock.style.backgroundImage = `url(../../images/${targetImage})`

            crossButton.addEventListener('click', function (event) {
                modalOverlay.classList.remove('turned-on')
            })

            modalOverlay.addEventListener('click', function (event) {
                modalOverlay.classList.remove('turned-on')
            })

            modal.addEventListener('click', function (event) {
                event.stopPropagation()
            })

        })
    })

    submitButton.addEventListener('click', function (event) {
        event.preventDefault()
        const nameInput = document.querySelector('#name')
        const messageInput = document.querySelector('#message-content')
        const callbackAddressInput = document.querySelector('#callback-address')

        if (nameInput.value && messageInput.value && callbackAddressInput.value) {

            const mail = {
                senderName: nameInput.value,
                senderMessage: messageInput.value,
                senderAddress: callbackAddressInput.value,
            }

            console.log(mail)

            alert('Спасибо за то, что уделили мне своё время! Я направлю вам свой ответ в течении суток. И прошу прощения за столь недостойный вид данного проекта, сказывается нехватка времени.')
        } else {

            alert('Для отправки сообщения, пожалуйста, заполните все поля формы.')
        }
    })
});