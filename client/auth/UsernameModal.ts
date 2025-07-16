export class UsernameModal {
  private modal: HTMLElement;
  private isVisible: boolean = false;
  private onUsernameSavedCallback?: (username: string) => void;

  constructor() {
    this.modal = this.createModal();
    document.body.appendChild(this.modal);
  }

  private createModal(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'username-modal hidden';
    modal.innerHTML = `
      <div class="username-modal-overlay"></div>
      <div class="username-modal-content">
        <div class="username-modal-header">
          <h2>Set Your Name</h2>
          <button class="username-modal-close" id="usernameModalClose">×</button>
        </div>
        
        <div class="username-modal-body">
          <div class="username-input-container">
            <input 
              type="text" 
              id="usernameInput" 
              placeholder="Enter your unique username" 
              maxlength="20"
              autocomplete="off"
            >
            <div class="username-status" id="usernameStatus">
              <span class="status-text" id="statusText"></span>
              <div class="status-spinner hidden" id="statusSpinner"></div>
            </div>
          </div>
          
          <div class="username-actions">
            <button class="save-username-btn disabled" id="saveUsernameBtn">
              <span>Save</span>
            </button>
          </div>
          
          <div class="username-info">
            <p>Choose a unique username that will be displayed to other players.</p>
            <p>Your username must be 3-20 characters long and can contain letters, numbers, and underscores.</p>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    const closeBtn = modal.querySelector('#usernameModalClose') as HTMLElement;
    const overlay = modal.querySelector('.username-modal-overlay') as HTMLElement;
    const usernameInput = modal.querySelector('#usernameInput') as HTMLInputElement;
    const saveBtn = modal.querySelector('#saveUsernameBtn') as HTMLElement;

    closeBtn.addEventListener('click', () => this.hide());
    overlay.addEventListener('click', () => this.hide());
    saveBtn.addEventListener('click', () => this.handleSaveUsername());
    usernameInput.addEventListener('input', () => this.handleUsernameInput());
    usernameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !saveBtn.classList.contains('disabled')) {
        this.handleSaveUsername();
      }
    });

    return modal;
  }

  private async handleUsernameInput(): Promise<void> {
    const usernameInput = this.modal.querySelector('#usernameInput') as HTMLInputElement;
    const saveBtn = this.modal.querySelector('#saveUsernameBtn') as HTMLElement;
    const statusText = this.modal.querySelector('#statusText') as HTMLElement;
    const statusSpinner = this.modal.querySelector('#statusSpinner') as HTMLElement;
    
    const username = usernameInput.value.trim();
    
    // Clear previous status
    statusText.textContent = '';
    statusSpinner.classList.add('hidden');
    saveBtn.classList.add('disabled');
    
    if (username.length === 0) {
      return;
    }
    
    // Validate username format
    if (username.length < 3) {
      statusText.textContent = 'Username must be at least 3 characters';
      statusText.className = 'status-text error';
      return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      statusText.textContent = 'Username can only contain letters, numbers, and underscores';
      statusText.className = 'status-text error';
      return;
    }
    
    // Show checking status
    statusText.textContent = 'Checking availability...';
    statusText.className = 'status-text checking';
    statusSpinner.classList.remove('hidden');
    
    try {
      // Check username availability
      const isAvailable = await this.checkUsernameAvailability(username);
      
      statusSpinner.classList.add('hidden');
      
      if (isAvailable) {
        statusText.textContent = '✓ Username available';
        statusText.className = 'status-text available';
        saveBtn.classList.remove('disabled');
      } else {
        statusText.textContent = '✗ Username already taken';
        statusText.className = 'status-text error';
      }
    } catch (error) {
      statusSpinner.classList.add('hidden');
      statusText.textContent = 'Error checking availability';
      statusText.className = 'status-text error';
      console.error('Username availability check failed:', error);
    }
  }

  private async checkUsernameAvailability(username: string): Promise<boolean> {
    // Import Firebase functions dynamically
    const { db, doc, getDoc } = await import('../firebase-config.js');
    
    try {
      const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
      return !usernameDoc.exists();
    } catch (error) {
      console.error('Error checking username availability:', error);
      throw error;
    }
  }

  private async handleSaveUsername(): Promise<void> {
    const usernameInput = this.modal.querySelector('#usernameInput') as HTMLInputElement;
    const saveBtn = this.modal.querySelector('#saveUsernameBtn') as HTMLButtonElement;
    const statusText = this.modal.querySelector('#statusText') as HTMLElement;
    
    if (saveBtn.classList.contains('disabled')) {
      return;
    }
    
    const username = usernameInput.value.trim();
    
    try {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<div class="spinner"></div><span>Saving...</span>';
      
      // Save username
      await this.saveUsername(username);
      
      statusText.textContent = '✓ Username saved successfully!';
      statusText.className = 'status-text success';
      
      // Notify callback immediately with the new username for instant UI update
      if (this.onUsernameSavedCallback) {
        console.log('Calling username callback with:', username);
        this.onUsernameSavedCallback(username);
      }
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        this.hide();
      }, 800);
      
    } catch (error) {
      console.error('Save username failed:', error);
      statusText.textContent = 'Failed to save username. Please try again.';
      statusText.className = 'status-text error';
      
      // Reset button
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<span>Save</span>';
    }
  }

  private async saveUsername(username: string): Promise<void> {
    // Import auth service and Firebase functions
    const { authService } = await import('./AuthService.js');
    const { db, doc, setDoc, updateDoc, deleteDoc } = await import('../firebase-config.js');
    
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    try {
      // Get current username from database before updating (more reliable than cache)
      const { getDoc } = await import('../firebase-config.js');
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const oldUsername = userDoc.exists() ? userDoc.data()?.username : null;
      
      console.log('Changing username from:', oldUsername, 'to:', username);
      
      // Reserve the new username
      await setDoc(doc(db, 'usernames', username.toLowerCase()), {
        uid: user.uid,
        username: username,
        createdAt: new Date()
      });
      
      // Update user profile with username
      await updateDoc(doc(db, 'users', user.uid), {
        username: username,
        usernameSet: true,
        usernameSetAt: new Date()
      });
      
      // Free up the old username if it exists and is different from the new one
      if (oldUsername && oldUsername.toLowerCase() !== username.toLowerCase()) {
        console.log('Attempting to delete old username:', oldUsername);
        try {
          await deleteDoc(doc(db, 'usernames', oldUsername.toLowerCase()));
          console.log('Successfully deleted old username:', oldUsername);
        } catch (deleteError) {
          console.error('Failed to delete old username:', oldUsername, deleteError);
          // Don't throw here - the new username is already saved successfully
        }
      } else {
        console.log('No old username to delete or same username');
      }
      
      console.log('Username saved to database successfully');
      
    } catch (error) {
      console.error('Error saving username:', error);
      throw error;
    }
  }

  show(onUsernameSaved?: (username: string) => void): void {
    this.isVisible = true;
    this.modal.classList.remove('hidden');
    this.onUsernameSavedCallback = onUsernameSaved;
    
    // Reset modal state
    const usernameInput = this.modal.querySelector('#usernameInput') as HTMLInputElement;
    const saveBtn = this.modal.querySelector('#saveUsernameBtn') as HTMLButtonElement;
    const statusText = this.modal.querySelector('#statusText') as HTMLElement;
    const statusSpinner = this.modal.querySelector('#statusSpinner') as HTMLElement;
    
    usernameInput.value = '';
    statusText.textContent = '';
    statusSpinner.classList.add('hidden');
    saveBtn.classList.add('disabled');
    saveBtn.disabled = false;
    saveBtn.innerHTML = '<span>Save</span>';
    
    // Focus input
    setTimeout(() => usernameInput.focus(), 100);
  }

  hide(): void {
    this.isVisible = false;
    this.modal.classList.add('hidden');
    this.onUsernameSavedCallback = undefined;
  }

  isModalVisible(): boolean {
    return this.isVisible;
  }
} 