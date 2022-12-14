import {ImageBackground, View} from "react-native";
import {commonsStyle, containerStyle, font} from "../../../commons/styles/commons.styles";
import {useState} from "react";
import NomChooser from "./nom-chooser.component";
import AvatarChooser from "./avatar-chooser.component";
import {Button} from "@rneui/themed";

export default function FormNouveauJoueur({ setResponseAvailable, responseAvailable, handleCreateJoueur, avatars, bordure, background }) {

    const [nom, setNom] = useState('');
    const [avatarChoisi, setAvatarChoisi] = useState('');

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ containerStyle.center }>
                    {
                        responseAvailable && responseAvailable.available ?
                            <AvatarChooser avatars={ avatars } avatarChoisi={ avatarChoisi } setAvatarChoisi={ setAvatarChoisi } bordure={ bordure } background={ background }/>
                            :
                            <NomChooser setResponseAvailable={ setResponseAvailable } responseAvailable={ responseAvailable } nom={ nom } setNom={ setNom } bordure={ bordure } background={ background }/>
                    }
                    {
                        avatarChoisi ?
                            <Button
                                onPress={ () => handleCreateJoueur(nom, avatarChoisi) }
                                title="C'est parti !"
                                radius={20}
                                titleStyle={ font(20, 'bold') }
                                buttonStyle={ commonsStyle.boutonSuccess }/>
                            :
                            null
                    }
                </View>
            </ImageBackground>
        </>
    )
}

