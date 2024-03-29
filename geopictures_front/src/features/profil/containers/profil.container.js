import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import * as React from "react";
import {useEffect, useState} from "react";
import Inventaire from "../components/inventaire.component";
import CarteVisite from "../components/carte-visite.component";
import {loadProfil, saveProfil} from "../services/profil.service";
import Toast from "react-native-root-toast";
import {handleError} from "../../../utils/http.utils";

export default function ProfilContainer({ navigation }) {

    const [loadingProfil, setLoadingProfil] = useState(false);
    const [profil, setProfil] = useState(null);

    const init = () => {
        setLoadingProfil(true);
        loadProfil()
            .then(profil => setProfil(profil.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingProfil(false))
    }

    const onSaveAvatar = (avatar) => {
        setLoadingProfil(true);

        const profilActif = {
            avatarIdActif: avatar.id,
            bordureIdActive: profil?.bordureActive?.id,
            titreIdActif: profil?.titreActif?.id
        }

        saveProfil(profilActif)
            .then(profil => setProfil(profil.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingProfil(false))
    }

    const onSaveBordure = (bordure) => {
        setLoadingProfil(true);

        const profilActif = {
            avatarIdActif: profil?.avatarActif?.id,
            bordureIdActive: bordure && bordure.id,
            titreIdActif: profil?.titreActif?.id
        }

        saveProfil(profilActif)
            .then(profil => setProfil(profil.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingProfil(false))
    }

    const onSaveTitre = (titre) => {
        setLoadingProfil(true);

        const profilActif = {
            avatarIdActif: profil?.avatarActif?.id,
            bordureIdActive: profil?.bordureActive?.id,
            titreIdActif: titre && titre.id
        }

        saveProfil(profilActif)
            .then(profil => setProfil(profil.data))
            .catch(err => {
                handleError(err, navigation);
                Toast.show(err.response.data);
            })
            .finally(() => setLoadingProfil(false))
    }

    useEffect(init, []);

    return(
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={ containerStyle.backgroundHover100 }>
                {loadingProfil && <LoadingGeneral titre={"Chargement en cours ..."}></LoadingGeneral>}
                <View style={ style.carteVisiteContainer }>
                    <CarteVisite profil={profil}></CarteVisite>
                </View>
                <View style={ style.inventaireContainer }>
                    <Inventaire navigation={navigation} profil={profil} onSaveAvatar={onSaveAvatar} onSaveBordure={onSaveBordure} onSaveTitre={onSaveTitre}></Inventaire>
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    carteVisiteContainer: {
        flex:1,
        margin:10
    },
    inventaireContainer: {
        flex:5,
        margin:10
    }
})