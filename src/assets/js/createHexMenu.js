var createMenuLayout =(menuEntity, items)=>{
    items = items?items:['Hellow','Im in', 'Yai','item2']
    var materials = createMaterials();

    var grid = menuEntity.firstElementChild
    var gridObject = grid.object3D
    
    var firstLevelChildren = gridObject.children
    if(firstLevelChildren.length){
        var secondLevelChildren = firstLevelChildren[0].children
        if(secondLevelChildren.length){
            var hexItems = secondLevelChildren[0].children
            if(hexItems.length){
                menuEntity.innerHTML+='<a-entity></a-entity>'
                for(var i = 0; i<items.length; i++){//Replace by array of items
                    var hex = hexItems[i]
                    var entityGroup = menuEntity.lastElementChild
                    var entity= document.createElement("A-ENTITY");
                    var textEntity= document.createElement("A-TEXT");
                    textEntity.setAttribute("value",items[i])
                    textEntity.setAttribute("color",'white')
                    textEntity.setAttribute("align",'center')

                    textEntity.object3D.position.set(0,0,1.5)
                    textEntity.object3D.scale.set(10,10,10)

                    entity.appendChild(textEntity)
                    entityGroup.appendChild(entity)

                    createCompatibleEntity(hex,materials,entity)
                }
                menuEntity.object3D.rotation.set(Math.PI/2,0,0)
                menuEntity.object3D.scale.set(0.1,0.1,0.1)
                menuEntity.removeChild(menuEntity.firstElementChild)
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

var createMaterials =()=>{
    var outline_shader = {
        vertex_shader: [
            "uniform float offset;",
            "void main() {",
                "vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
                "gl_Position = projectionMatrix * pos;",
            "}"
        ].join("\n"),
    
        fragment_shader: [
            "void main(){",
                "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );",
            "}"
        ].join("\n")
    };
    var fusing_shader =[
        "void main(){",
            "gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );",
        "}"
    ].join("\n")
    
    var  uniforms ={offset:{
        type: "f",
        value: 1
    }}
    
    var outline_material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(outline_shader.uniforms),
        vertexShader: outline_shader.vertex_shader,
        fragmentShader: outline_shader.fragment_shader,
        side: THREE.BackSide
    });
    var outline_Fusing_material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(outline_shader.uniforms),
        vertexShader: outline_shader.vertex_shader,
        fragmentShader: fusing_shader,
        side: THREE.BackSide
    });
    return{outline:outline_material,fusing:outline_Fusing_material}
}
var createCompatibleEntity=(originObject, materials, entity)=>{

    var objectCopy = new THREE.Mesh( originObject.geometry, originObject.material )
    objectCopy.material.color.set( 0x220033 );
    //objectCopy.material.colorWrite=false; //Working but renderOrder doesn't

    var outline = new THREE.Mesh( objectCopy.geometry, materials.outline );
    objectCopy.add(outline)
    outline.scale.set(1.05,1.05,1.05)

    var pos = originObject.getWorldPosition()
    var scale = originObject.getWorldScale()

    entity.setObject3D('Mesh',objectCopy)

    entity.object3D.position.set(pos.x,pos.y,pos.z)
    entity.object3D.scale.set(scale.x*0.9,scale.y*0.9,scale.z*0.9)
    entity.object3D.rotation.set(-Math.PI/2,0,0)

    entity.addEventListener('click',function(){
    console.log('You Click Me :3 !')
    })
    entity.addEventListener('fusing',function(){
    this.object3D.children[1].children[0].material=materials.fusing
    })
    entity.addEventListener('mouseleave',function(){
    this.object3D.children[1].children[0].material=materials.outline
    })
    outline.renderOrder=100; //Not working for some reason
}
export {createMenuLayout}