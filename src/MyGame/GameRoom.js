
/*
 * File: GameRoom.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameRoom() {
    //this.kTestTexture = "assets/TestTexture.png";
    
    this.kPlatTexture = "assets/RigidShape/Wood.png";
    this.kAnt1 = "assets/RigidShape/Ice.png";
    this.kAnt2 = "assets/RigidShape/Dirt.png";
    this.kAnt3 = "assets/RigidShape/Mud.png";
    this.kAnt4 = "assets/RigidShape/Rock.png";
    this.kAnt5 = "assets/platform.png";

    
    //this.kStabTexture = "assets/TestStab.png";
    //this.kWood = "assets/RigidShape/Wood.png";
    //this.kIce = "assets/RigidShape/Ice.png";
    //this.kDirt = "assets/RigidShape/Dirt.png";

    // The camera to view the scene
    this.mCamera = null;
    // backGround
    // Objects
    this.mPlat;
    this.mAntSet = new GameObjectSet();
    

    //Tools
    this.mStart = false;
    this.mNum = 0;
}
gEngine.Core.inheritPrototype(GameRoom, Scene);

GameRoom.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kTestTexture);

    gEngine.Textures.loadTexture(this.kPlatTexture);

    gEngine.Textures.loadTexture(this.kAnt1);
    gEngine.Textures.loadTexture(this.kAnt2);
    gEngine.Textures.loadTexture(this.kAnt3);
    gEngine.Textures.loadTexture(this.kAnt4);
    gEngine.Textures.loadTexture(this.kAnt5);

    //gEngine.Textures.loadTexture(this.kStabTexture);
    //gEngine.Textures.loadTexture(this.kWood);
    //gEngine.Textures.loadTexture(this.kIce);
    //gEngine.Textures.loadTexture(this.kDirt);
};

GameRoom.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kTestTexture);

    gEngine.Textures.unloadTexture(this.kPlatTexture);

    gEngine.Textures.unloadTexture(this.kAnt1);
    gEngine.Textures.unloadTexture(this.kAnt2);
    gEngine.Textures.unloadTexture(this.kAnt3);
    gEngine.Textures.unloadTexture(this.kAnt4);
    gEngine.Textures.unloadTexture(this.kAnt5);

    //gEngine.Textures.unloadTexture(this.kStabTexture);
    //gEngine.Textures.unloadTexture(this.kWood);
    //gEngine.Textures.unloadTexture(this.kIce);
    //gEngine.Textures.unloadTexture(this.kDirt);


    gEngine.Core.changeScene(new GameRoom(), true);
    

};

GameRoom.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    gEngine.Mine.getVariable();



    //platforms

    this.mPlat = new NormalPlatform(this.kPlatTexture, 0, 0, 600, 20);
    this.mAntSet.addToSet(new Ant(this.kAnt1,gEngine.Mine.position[0],20,20,20,-310,310,gEngine.Mine.velocity[0])); //-290
    this.mAntSet.addToSet(new Ant(this.kAnt2,gEngine.Mine.position[1],20,20,20,-310,310,gEngine.Mine.velocity[1])); //-200
    this.mAntSet.addToSet(new Ant(this.kAnt3,gEngine.Mine.position[2],20,20,20,-310,310,gEngine.Mine.velocity[2])); //-100
    this.mAntSet.addToSet(new Ant(this.kAnt4,gEngine.Mine.position[3],20,20,20,-310,310,gEngine.Mine.velocity[3])); //170
    this.mAntSet.addToSet(new Ant(this.kAnt5,gEngine.Mine.position[4],20,20,20,-310,310,gEngine.Mine.velocity[4])); //290
    this.mNum = this.mAntSet.size();
    //gEngine.Mine.timeStart();
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameRoom.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
	
    this.mPlat.draw(this.mCamera);
    this.mAntSet.draw(this.mCamera);

};
GameRoom.prototype.allFall = function(){
    var num = 5;
    var i;
    for(i=0;i<5;i++){
        
        if(this.mAntSet.getObjectAt(i).isFall()){
            num = num-1;
        }
    }
    if(num === 0){
        return true;
    }else{
        return false;
    }
};

GameRoom.prototype.update = function () {

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        gEngine.Mine.setZero();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
        gEngine.Mine.reStart();
        gEngine.Mine.timeStart();
        this.mStart = true;
    }
    gEngine.Mine.timeSpend();
    var i;
    
    for(i=0;i<this.mAntSet.size();i++){
        var aa = this.mAntSet.getObjectAt(i);
        var j;
        for(j=i+1;j<this.mAntSet.size();j++){
            var bb = this.mAntSet.getObjectAt(j);
            if(aa.isCollide(bb)!==0){
                bb.changeDir();
                aa.changeDir();
                console.log("Ant"+i+aa.getSp());
                console.log("Ant"+j+bb.getSp());
            }
        }
    }
    if(this.allFall() || gEngine.Input.isKeyClicked(gEngine.Input.keys.D)){
        gEngine.Mine.gameStatus.finish = true;
    }
    
    this.mPlat.update();
    if(this.mStart){
        this.mAntSet.update();
    }
    
    
};