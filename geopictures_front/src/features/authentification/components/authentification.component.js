import {Image, ImageBackground, View, StyleSheet} from "react-native";
import {commonsStyle, containerStyle, font, primary1} from "../../../commons/styles/commons.styles";
import { Button } from "@rneui/themed";
import {getUserData} from "../services/authentification.service";

export default function Authentification({ navigation, accessToken, promptAsync }) {
    return(
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                <View style={ containerStyle.center }>
                    <Image
                        source={require('../../../../assets/geopictures_logo_2.png')}
                        style={style.logo}
                    />
                    <Button
                        onPress={ () => navigation.navigate('accueil', {joueurInformations: null}) }
                        title="JOUER"
                        raised={true}
                        radius={20}
                        titleStyle={ font(50, 'bold') }
                        buttonStyle={ commonsStyle.boutonSuccess }/>
                    <Button
                        title={accessToken ? "   Get info" : "   Se connecter avec Google"}
                        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents : true})}}
                        icon={<Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={{width:20, height:20}}/>}
                        buttonStyle={style.buttonGoogleAuth }
                        titleStyle={style.textGoogleAuth}/>
                </View>
            </ImageBackground>
)
}

const style = StyleSheet.create({
    logo: {
        width: "70%",
        height: "70%",
        resizeMode: "contain",
    },
    buttonPlayInvite: {
        backgroundColor: primary1,
        borderStyle: "solid",
        borderWidth: 4,
        borderColor: "white",
    },
    buttonGoogleAuth: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "white",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
        marginTop: 20,
    },
    textGoogleAuth: {
        color: 'grey'
    },
});
