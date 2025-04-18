import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Client as ConversationsClient } from "@twilio/conversations";
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { lastValueFrom, tap } from 'rxjs';
import { nanoid } from "nanoid";
import { TwakComponent } from '../twak/twak.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, TwakComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  status: boolean = false;
  imageUrl: String;
  footerData: any;
  socialData: any;
  consversationData: any;
  client: ConversationsClient | undefined;
  isChatToken: any = false;
  chatToken: any;
  messageText: any;
  submitted: boolean = false
  messageArray: any = [];
  userRegBtn = true;
  userName: any;
  userEmail: any = '';

  constructor(
    private commonService: CommonService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.imageUrl = environment.imageEndPoint;
    this.consversationData = {
      statusString: "",
      activeConversation: null,
      name: "",
      nameRegistered: false,
      isConnected: false
    };
  }

  chatTokenForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-+-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,}')])
  });

  chatMessageForm = new FormGroup({
    outgoing: new FormControl(''),
  })

  ngOnInit(): void {
    this.getfooterSection();
    if (isPlatformBrowser(this.platformId)) {

      this.loadSupportMessages();

      setTimeout(() => {
        this.status = true;
      }, 12000);

    }
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  async loadSupportMessages() {
    this.isChatToken = false;
    // get token stored in the local storage
    const token = localStorage.getItem('TWILIO_ACCESS_TOKEN');
    const conversationId = localStorage.getItem('TWILIO_CONVERSATION_SID')
    if (token && conversationId) {
      try {
        this.userRegBtn = false;
        // parse token and check expiration
        const tokenData = this.parseJwt(token);
        if (tokenData && tokenData.exp) {
          const hasExpiredToken = new Date().valueOf() >= new Date(tokenData.exp * 1000).valueOf();
          const userIdentity = tokenData.grants.identity;
          this.userName = userIdentity;
          if (hasExpiredToken) {
            try {
              this.chatToken = await lastValueFrom(this.generateChatToken());
              // show send message text in the button
              this.isChatToken = true;
            } catch (error) {
              this.userRegBtn = true;
              this.isChatToken = false;
            }
          } else {
            this.chatToken = token;
            // show send message text in the button
            this.isChatToken = true;
          }
          await this.initConversationsClient(this.chatToken);
          this.consversationData.activeConversation = await this.client!.getConversationBySid(conversationId);
          this.client?.on('tokenAboutToExpire', this.handleTokenExpiration);
          if (this.consversationData && this.consversationData.activeConversation) {
            this.consversationData.activeConversation.on("messageAdded", this.handleReceivedMessage.bind(this));
          }
          this.getChatMessages();
        }
      } catch (error) {
        // show loader
        this.userRegBtn = true;
      }
    }
  }


  ngAfterViewInit(): void {}

  clickEvent() {
    this.status = !this.status;
  }


  getfooterSection() {
    this.commonService.commanfooterdata.subscribe((res: any) => {
      if (res) {
        this.footerData = res.data.attributes.footer;
        this.socialData = res.data.attributes.socialLinks;
        this.cd.detectChanges();

      }
    })
  }

  generateChatToken() {
    return this.commonService.chatToken(this.userName).pipe(
      tap(
        res => {
          localStorage.setItem('TWILIO_ACCESS_TOKEN', res);
        }
      )
    );
  }

  // GETTING USER CHAT TOKEN
  getUserChatToken() {
    this.submitted = true
    if (this.chatTokenForm.invalid) {
      return
    }
    this.isChatToken = false;
    this.userRegBtn = false;
    const userName = this.chatTokenForm.value['username'];
    const userEmail = this.chatTokenForm.value['email']
    this.userName = `${userName} (${nanoid()})`;
    this.userEmail = userEmail;
    this.generateChatToken().subscribe(async (res: any) => {
     

      this.chatToken = res;
      if (res != null) {
        try {
          await this.initConversationsClient(res)

          // setTimeout(() => {
          await this.createConversation(this.userName)
          // }, 5000);

          // setTimeout(() => {
          this.addConversationMessage()
          this.getChatMessages()
          // }, 11000);

          // setTimeout(() => {
          //  this.isChatToken = true
          // }, 12000);
        } catch (error) {
          this.isChatToken = false;
          this.userRegBtn = true;
        }

      }

    })
  }

  handleTokenExpiration() {
    this.commonService.chatToken(this.userName).subscribe(
      res => {
        if (res) {
          this.chatToken = res;
          this.client?.updateToken(this.chatToken).then(result => {
          
          }).catch(
            err => {
            
            }
          );
        }
      }
    )
  }

  // INITIALIZING THE CONVERSATION CLIENT

  initConversationsClient(token: any) {
    return new Promise((resolve, reject) => {
      this.client = new ConversationsClient(token)
     
      this.consversationData.statusString = "Connecting to Twilio..."
      this.client.on("connectionStateChanged", (state: any) => {
        switch (state) {
          case "connected":
            this.consversationData.statusString = "You are connected."
            this.consversationData.isConnected = true
            resolve(true);
            break
          case "disconnecting":
            this.consversationData.statusString = "Disconnecting from Twilio..."
            break
          case "disconnected":
            this.consversationData.statusString = "Disconnected."
            break
          case "denied":
            this.consversationData.statusString = "Failed to connect."
            this.consversationData.isConnected = false
            reject(false);
            break
        }
      })
    })

  }

  //  CREATE CONVERSATION  CLIENT :-
  async createConversation(userName: any) {
    // Ensure User1 and User2 have an open client session
    // try {

    //     // await this.client!.getUser(userName)
    //    // await this.client.getUser("sushant")


    // } catch {
    //     console.error("Waiting for User1 and User2 client sessions")
    //     return false;
    // }
    const conversationUniqueId = `help-desk-chat-${nanoid()}`;
    const conversationFriendlyName = `help desk chat with ${this.userName}`;
    // Try to create a new conversation and add User1 and User2
    // If it already exists, join instead
    try {
      
      this.client?.on('tokenAboutToExpire', this.handleTokenExpiration);
      const newConversation = await this.client!.createConversation({ uniqueName: conversationUniqueId, friendlyName: conversationFriendlyName })

      const joinedConversation = await newConversation.join().catch((err: any) => {})
      await this.client!.user.updateFriendlyName(this.userEmail + " || " + window.location.href)
      await joinedConversation!.add(environment.twilioAgentIdentity).catch((err: any) =>  {})
     
      this.consversationData.activeConversation = joinedConversation
      localStorage.setItem('TWILIO_CONVERSATION_SID', newConversation.sid);
      

    } catch {
      this.consversationData.activeConversation = await (this.client!.getConversationByUniqueName(conversationUniqueId))
    } finally {
      if (this.consversationData && this.consversationData.activeConversation) {
        this.consversationData.activeConversation.on("messageAdded", this.handleReceivedMessage.bind(this));
      }
    }
  }

  handleReceivedMessage(message: string) {
    this.messageArray = [...this.messageArray, message]
  }

  addConversationMessage() {
    this.messageText = this.chatMessageForm.value.outgoing
  
    this.consversationData.activeConversation.sendMessage(this.messageText)
      .then(() => {
        this.messageText = ""
      })
  }

  getChatMessages() {
    this.consversationData.activeConversation.getMessages()
      .then((newMessages: { items: any; }) => {
        this.messageArray = [...this.messageArray, ...newMessages.items]
        this.isChatToken = true;
      }).catch(
        (err: any) => {
          this.isChatToken = false
        }
      )
  }

  ngOnDestroy(): void {
    if (this.consversationData && this.consversationData.activeConversation) {
      this.consversationData.activeConversation.off("messageAdded", this.handleReceivedMessage);
    }

    if (this.client) {
      this.client.off('tokenAboutToExpire', this.handleTokenExpiration)
    }
  }
}
