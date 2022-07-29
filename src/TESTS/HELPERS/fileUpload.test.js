import { fileUploadHelper } from "../../HELPERS/fileUpload";
import cloudinary from 'cloudinary';

describe('Pruebas en fileUpload', () => {

    cloudinary.config({ 
        cloud_name: 'martinrole', 
        api_key: '946198951795132', 
        api_secret: 'C84Wb54tJB2yoFcUP5wWIRJZ2hU',
        secure: true
      });

      //Video explicación 279
    test('Debe de cargar un archivo y de retornar el URL', async ( ) => {

        const respuesta = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
        const blob = await respuesta.blob()

        
        const file = new File([blob], 'fotico.jpg')
        const url = await fileUploadHelper( file )
        
        expect( typeof url ).toBe('string')

        //Borrar imàgen de cloudinary video 280:
        const imgUrl = url.split('/')
        const imgId = imgUrl[ imgUrl.length - 1 ].replace('.jpg','')

        // Este es el comando de SDK de cloudinary
        //cloudinary.v2.api.delete_resources(public_ids, options, callback);  
        cloudinary.v2.api.delete_resources( imgId, {}, () => {} );
 
    })

    test('Debe de cargar un error si no se carga imagen', async () => {

        const file = new File([], 'fotico.png')
        const url = await fileUploadHelper( file )
        
        expect( url ).toBe( null )
    })
})