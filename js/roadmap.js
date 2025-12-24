// ===== STUDY IN ITALY ROADMAP - WALKING CHARACTER ANIMATION =====

class RoadmapManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
   
        this.animationSpeed = 'normal';
        this.animationTimeouts = [];
        this.characterPositions = [5, 20, 35, 50, 65, 80, 95]; // Percentage positions for each step
        
        this.initialize();
    }
    
    initialize() {
        console.log('🚀 Initializing Study in Italy Roadmap...');
        
        // Hide loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('roadmap-loading');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }
        }, 800);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize character position
        this.updateCharacterPosition();
        
        // Update UI to show first step
        this.updateStepDisplay();
        
        console.log('✅ Roadmap initialized');
    }
    
    
    setupEventListeners() {
        // Navigation controls
        document.getElementById('prev-step')?.addEventListener('click', () => this.previousStep());
        document.getElementById('next-step')?.addEventListener('click', () => this.nextStep());
        
        // Step indicators
        document.querySelectorAll('.step-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const step = parseInt(e.target.dataset.step);
                this.goToStep(step);
            });
        });
        
        // Step markers on the road
        document.querySelectorAll('.step-marker').forEach(marker => {
            marker.addEventListener('click', (e) => {
                const step = parseInt(e.currentTarget.dataset.step);
                this.goToStep(step);
            });
        });
        
        // Auto-play controls
        document.getElementById('play-all')?.addEventListener('click', () => this.playCompleteJourney());
        document.getElementById('pause-journey')?.addEventListener('click', () => this.pauseJourney());
        
        // Control panel
        document.getElementById('roadmap-controls-toggle')?.addEventListener('click', () => this.toggleControlsPanel());
        document.getElementById('close-controls')?.addEventListener('click', () => this.toggleControlsPanel());
        document.getElementById('reset-roadmap')?.addEventListener('click', () => this.resetRoadmap());
        document.getElementById('print-roadmap')?.addEventListener('click', () => this.printRoadmap());
        
        // Animation speed control
        document.getElementById('animation-speed')?.addEventListener('change', (e) => {
            this.animationSpeed = e.target.value;
        });
        

        
        // Action buttons
        document.querySelectorAll('.btn-action').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleAction(action);
            });
        });
        
        // Close controls panel when clicking outside
        document.addEventListener('click', (e) => {
            const controlsPanel = document.getElementById('controls-panel');
            const controlsToggle = document.getElementById('roadmap-controls-toggle');
            
            if (controlsPanel && controlsPanel.style.display === 'block' && 
                !controlsPanel.contains(e.target) && 
                e.target !== controlsToggle && 
                !controlsToggle.contains(e.target)) {
                this.toggleControlsPanel();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousStep();
            } else if (e.key === 'ArrowRight') {
                this.nextStep();
            } else if (e.key === 'Escape') {
                this.toggleControlsPanel();
            }
        });
    }
    
    goToStep(step) {
        if (step < 1 || step > this.totalSteps || step === this.currentStep) return;
        
        // Clear any ongoing animations
        this.clearTimeouts();
        
        // Update current step
        this.currentStep = step;
        
        // Update UI
        this.updateStepDisplay();
        this.updateCharacterPosition();
        this.updateProgressBar();
        
        // Update step indicators
        this.updateStepIndicators();
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Add celebration effect for reaching final step
        if (step === this.totalSteps) {
            this.celebrateJourneyCompletion();
        }
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }
    
    updateStepDisplay() {
        // Hide all step details
        document.querySelectorAll('.step-detail').forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Show current step detail
        const currentDetail = document.querySelector(`.step-detail[data-step="${this.currentStep}"]`);
        if (currentDetail) {
            currentDetail.classList.add('active');
        }
        
        // Update step title and number
        const stepTitle = document.getElementById('current-step-title');
        const stepNumber = document.getElementById('current-step-number');
        
        if (stepTitle && stepNumber) {
            const stepNames = [
                'Start Your Journey',
                'University Shortlisting',
                'Application Filing',
                'Pre-enrollment',
                'Scholarship Application',
                'DOV / CIMEA',
                'Visa Application'
            ];
            
            stepTitle.textContent = stepNames[this.currentStep];
            stepNumber.textContent = this.currentStep;
        }
        
        // Highlight current step marker
        document.querySelectorAll('.step-marker').forEach(marker => {
            const markerStep = parseInt(marker.dataset.step);
            const markerCircle = marker.querySelector('.marker-circle');
            
            if (markerCircle) {
                if (markerStep === this.currentStep) {
                    markerCircle.style.background = 'var(--italy-green)';
                    markerCircle.style.color = 'white';
                    markerCircle.style.borderColor = 'white';
                    markerCircle.style.transform = 'scale(1.2)';
                    markerCircle.style.boxShadow = '0 0 20px rgba(0, 140, 69, 0.5)';
                } else if (markerStep < this.currentStep) {
                    markerCircle.style.background = 'rgba(0, 140, 69, 0.3)';
                    markerCircle.style.color = 'var(--italy-green)';
                    markerCircle.style.borderColor = 'var(--italy-green)';
                    markerCircle.style.transform = 'scale(1)';
                    markerCircle.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                } else {
                    markerCircle.style.background = 'var(--road-marker)';
                    markerCircle.style.color = 'var(--road-color)';
                    markerCircle.style.borderColor = 'var(--road-color)';
                    markerCircle.style.transform = 'scale(1)';
                    markerCircle.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                }
            }
        });
    }
    
    updateCharacterPosition() {
        const characterContainer = document.getElementById('character-container');
        if (!characterContainer) return;
        
        // Calculate position based on current step
        const position = this.characterPositions[this.currentStep - 1];
        
        // Update character position with smooth animation
        characterContainer.style.left = `${position}%`;
        
        // Add walking animation effect
        this.animateCharacterWalking();
    }
    
    animateCharacterWalking() {
        const character = document.getElementById('stickman-character');
        if (!character) return;
        
        // Reset any existing animations
        character.style.animation = 'none';
        
        // Force reflow to restart animation
        void character.offsetWidth;
        
        // Apply walking animation based on speed
        let animationDuration;
        switch(this.animationSpeed) {
            case 'slow': animationDuration = '1.2s'; break;
            case 'fast': animationDuration = '0.6s'; break;
            default: animationDuration = '0.8s';
        }
        
        character.style.animation = `bounce ${animationDuration} infinite alternate`;
        
        // Animate individual body parts
        const leftArm = document.querySelector('.left-arm');
        const rightArm = document.querySelector('.right-arm');
        const leftLeg = document.querySelector('.left-leg');
        const rightLeg = document.querySelector('.right-leg');
        
        if (leftArm) leftArm.style.animationDuration = animationDuration;
        if (rightArm) rightArm.style.animationDuration = animationDuration;
        if (leftLeg) leftLeg.style.animationDuration = animationDuration;
        if (rightLeg) rightLeg.style.animationDuration = animationDuration;
    }
    
    updateProgressBar() {
        const progressBar = document.getElementById('path-progress');
        if (!progressBar) return;
        
        // Calculate progress percentage (step 1 = 10%, step 6 = 95%)
        const progressPercentage = 5 + (this.currentStep * 15);
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    updateStepIndicators() {
        document.querySelectorAll('.step-indicator').forEach(indicator => {
            const step = parseInt(indicator.dataset.step);
            
            if (step === this.currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    updateNavigationButtons() {
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton) {
            prevButton.disabled = this.currentStep === 1;
        }
        
        if (nextButton) {
            nextButton.disabled = this.currentStep === this.totalSteps;
        }
    }
    

    

    
    clearTimeouts() {
        this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
        this.animationTimeouts = [];
    }
    
    toggleControlsPanel() {
        const panel = document.getElementById('controls-panel');
        if (!panel) return;
        
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    }
    
    resetRoadmap() {
        this.pauseJourney();
        this.goToStep(1);
    }
    
    printRoadmap() {
        window.print();
    }
    
    handleAction(action) {
        const actions = {
            explore: () => {
                window.open('index.html', '_blank');
            },
            tips: () => {
                alert('💡 University Selection Tips:\n\n1. Match your academic profile\n2. Consider location and living costs\n3. Check English-taught programs\n4. Research scholarship opportunities\n5. Look at graduate employment rates');
            },
            documents: () => {
                alert('📄 Required Documents:\n\n• Academic transcripts\n• English proficiency certificate\n• Statement of Purpose\n• Letters of Recommendation\n• Passport copy\n• CV/Resume');
            },
            deadlines: () => {
                alert('📅 Important Deadlines:\n\n• University Applications: Usually Jan-Mar\n• Scholarships: Varies by region\n• Visa Applications: 3-4 months before course start\n• Pre-enrollment: Depends on university deadlines');
            },
            universitaly: () => {
                window.open('https://www.universitaly.it', '_blank');
            },
            guide: () => {
                alert('📘 Pre-enrollment Guide:\n\n1. Create account on Universitaly\n2. Select your university and course\n3. Upload required documents\n4. Submit application\n5. Track application status');
            },
            scholarships: () => {
                window.open('https://www.study-in-italy.it/scholarships', '_blank');
            },
            cimea: () => {
                window.open('https://www.cimea.it', '_blank');
            },
            help: () => {
                alert('🤝 DOV/CIMEA Assistance:\n\nNeed help with document legalization? Contact:\n\nEmail: deepserish2023@teachfornepal.org\nWhatsApp: +9779860752277');
            },
            visa: () => {
                alert('🛂 Visa Requirements:\n\n1. Completed application form\n2. Passport with 2 blank pages\n3. University acceptance letter\n4. University pre-enrollment\n5. Proof of financial means (~700Euro/month or ~7000 Euro for first academic year)\n6. Health insurance\n7. Accommodation proof\n8. Flight reservation');
            },
            appointment: () => {
                window.open('https://visa.vfsglobal.com/npl/en/ita/')
            }
        };
        
        if (actions[action]) {
            actions[action]();
        }
    }
    
    celebrateJourneyCompletion() {
        // Add celebration animation to character
        const character = document.getElementById('stickman-character');
        if (character) {
            character.style.animation = 'none';
            void character.offsetWidth;
            character.style.animation = 'bounce 0.5s ease 3';
        }
        
        // Add confetti effect
        this.createConfetti();
        
        // Show celebration message
        setTimeout(() => {
            alert('🎉 Congratulations! You have completed the Study in Italy roadmap!\n\nYou are now ready to begin your Italian education journey. Buona fortuna! 🇮🇹');
        }, 1000);
    }
    
    createConfetti() {
        const colors = ['#008C45', '#F4F5F0', '#CD212A'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: ${85 + Math.random() * 10}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall 1s ease-out forwards;
                z-index: 100;
            `;
            
            document.querySelector('.road-visualization').appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 1000);
        }
        
        // Add confetti animation to CSS
        if (!document.querySelector('#confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(200px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== INITIALIZE ROADMAP =====
let roadmap;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        roadmap = new RoadmapManager();
    });
} else {
    roadmap = new RoadmapManager();
}

// ===== GLOBAL EXPORTS =====
window.roadmap = roadmap;