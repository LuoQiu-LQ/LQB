// 计算年龄
function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// 设置年龄
document.addEventListener('DOMContentLoaded', function() {
    // 计算并显示年龄
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge('2005-05-10');
    }

    // 平滑滚动导航
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 表单验证
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            
            let isValid = true;
            
            // 验证姓名
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            // 验证留言
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // 模拟表单提交
                alert('感谢您的留言！我们会尽快回复您。');
                this.reset();
            }
        });
    }

    // 添加动画类
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate__animated', 'animate__fadeInUp');
    });
});

// 滚动时显示/隐藏返回顶部按钮
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});
