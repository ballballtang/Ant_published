/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, vec2, Scene */

function MyGame() {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kBg = "assets/title.png";
    
    this.kStartBGM = "assets/Sound/startBGM.mp3";
    this.kLevelBGM = "assets/Sound/levelBGM.mp3";
    this.kBossBGM = "assets/Sound/bossBGM.mp3";
    this.kEndBGM = "assets/Sound/endBGM.mp3";
    this.kButtonSound = "assets/Sound/button.mp3";
    this.kGetSound = "assets/Sound/get.mp3";
    this.kGunSound = "assets/Sound/gun.mp3";
    this.kJumpSound = "assets/Sound/jump.mp3";
    this.kPaperSound = "assets/Sound/paper.mp3";
    this.kHitSound = "assets/Sound/hit.mp3";
    this.kBreakSound = "assets/Sound/break.mp3";
    this.kBloodSound = "assets/Sound/blood.mp3";
    
//    this.kBeginning = [];
//    for (var i = 0; i < 277; i++) {
//        if (i < 10) {
//            this.kBeginning[i] = "assets/Beginning/beginning000" + i + ".png";
//        } else if (i < 100) {
//            this.kBeginning[i] = "assets/Beginning/beginning00" + i + ".png";
//        } else {
//            this.kBeginning[i] = "assets/Beginning/beginning0" + i + ".png";
//        }
//    }
//    this.kEnding = [];
//    for (var i = 0; i <266; i++) {
//        if (i < 10) {
//            this.kEnding[i] = "assets/Ending/ending000" + i + ".png";
//        } else if (i < 100) {
//            this.kEnding[i] = "assets/Ending/ending00" + i + ".png";
//        } else {
//            this.kEnding[i] = "assets/Ending/ending0" + i + ".png";
//        }
//    }

    this.mCamera = null;
    this.LevelSelect = null;

    this.mBg = null;
    this.UIButton = null;
    this.UIButton2 = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {

    
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBg);

    
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBg);

    if (this.LevelSelect === "PlayMode") {
        gEngine.Core.changeScene(new GameRoom(), true);

    }
    if (this.LevelSelect === "AutoMode") {
        gEngine.Core.changeScene(new GameRoom2(), true);
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    //this.mBg = new Platform(this.kBg, 0, 0, 1200, 675);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.UIButton = new UIButton(this.gameSelect, this, [260, 280], [200, 60], "PlayMode", 24);
    this.UIButton2 = new UIButton(this.autoSelect, this, [260, 200], [200, 60], "AutoMode", 24);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.UIButton.draw(this.mCamera);
    this.UIButton2.draw(this.mCamera);
    //this.mBg.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.UIButton.update();
    this.UIButton2.update();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.startGameSelect();
    }
};

MyGame.prototype.gameSelect = function () {
    this.LevelSelect = "PlayMode";
    gEngine.GameLoop.stop();
};

MyGame.prototype.autoSelect = function () {
    this.LevelSelect = "AutoMode";
    gEngine.GameLoop.stop();
};

