/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function Ant(t, atX, atY, w, h, s, e , sp) {
    SpriteObj.call(this, t, atX, atY, w, h, [0, w, 0, 32]);
    
    this.mVP.setXV(sp);
    this.mstart = s;
    this.mend = e;
    this.mSpeed = sp;
    this.mIsFall = false;
}
gEngine.Core.inheritPrototype(Ant, SpriteObj);

Ant.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};

Ant.prototype.isFall = function (){
    return this.mIsFall;
};

Ant.prototype.changeSp = function (s){
    this.mSpeed = s;
    this.mVP.setXV(this.mSpeed);
};

Ant.prototype.changeDir = function(){
    this.mSpeed = this.mSpeed*(-1);
    this.mVP.setXV(this.mSpeed);
    
};

Ant.prototype.getSp = function(){
    return this.mSpeed;
};

Ant.prototype.isCollide = function(aAnt){
    var a = this.getBBox();
    var b = aAnt.getBBox();
    var status = a.boundCollideStatus(b);
    return status;
};

Ant.prototype.update = function () {
    SpriteObj.prototype.update.call(this);
    
    var xf = this.getXform();
    //this.mVP.update();
    if (xf.getXPos() <= this.mstart || xf.getXPos() >= this.mend) {
        this.setVisibility(false);
        this.mIsFall = true;
    }

};