import {Text} from "@rneui/base";
import React, {useEffect, useState} from 'react'
import {Button, Image, StyleSheet, View} from "react-native";
import {getGadgetLocation, useGadgetLocation} from "../../features/jeu/services/jeu.service";
import {Gadget} from "../../features/jeu/enums/gadget.enum";
import LoadingView from "../component/loading.component";
import FlecheDirectionAzimute from "../../features/jeu/components/fleche-direction-azimute.component";

const ModalUseGadgetDirection = ({ modal: { closeModal, getParam  }}) => {

    const [gadget, setGadget] = useState(null);
    const [loading, setLoading] = useState(false);

    const init = () => {
        setLoading(true);
        const photoId = getParam('photoId', null);
        const location = getParam('location', null);

        if(!location) return;

        getGadgetLocation(Gadget.DIRECTION, photoId, location)
            .then(res => setGadget(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const handlePressUseGadgetDistance = async () => {
        setLoading(true);
        const photoId = getParam('photoId', null);
        const location = getParam('location', null);

        useGadgetLocation(Gadget.DIRECTION, photoId, location)
            .then(res => setGadget(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        init();
    }, []);

    return(
        <>
            {
                loading ?
                    <LoadingView color={"white"}/>
                    :
                    <View style={ style.modalContainer }>
                        <Text style={style.title}>Gadget Direction</Text>
                        <View style={style.descriptionContainer}>
                            <Image style={style.image} source={require('../../../assets/gadget_cardinal.png')}></Image>
                            <Text style={style.descriptionText}>{gadget?.libelle}</Text>
                        </View>
                        <Text style={style.stock}>En stock : {gadget?.quantite}</Text>
                        {
                            gadget?.reponse ?
                                <View style={style.reponseContainer}>
                                    <View style={{flex:1}}>
                                        <FlecheDirectionAzimute angleDiffByNord={gadget.reponse}></FlecheDirectionAzimute>
                                    </View>
                                </View>
                                :
                                <>
                                {
                                    gadget?.quantite > 0 ?
                                        <Button title={"utiliser"} color={"green"} onPress={handlePressUseGadgetDistance}></Button>
                                        :
                                        <Button title={"Acheter"} color={"green"}></Button>
                                }
                                </>
                        }
                    </View>
            }
        </>

        )
};

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#5f5f5f",
        padding: 20,
        borderRadius: 20,
        borderWidth:2,
        maxWidth:"95%",
        alignSelf:'center'
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf:'center'
    },
    image: {
        borderWidth:2,
        width: 100,
        height: 100
    },
    descriptionContainer: {
        padding: 10,
        flexDirection: "row",
        justifyContent:'space-between'
    },
    descriptionText: {
        maxWidth: "50%",
        color:"#ffffff",
        alignSelf:'center'
    },
    stock: {
        alignSelf:'center',
        margin:10,
        color:"white",
        fontWeight:'bold'
    },
    reponseContainer: {
        margin:10,
        flexDirection:"row",
        alignSelf:'center'
    },
    reponse: {
        color:"white",
        fontWeight:'bold',
    }
})

export default ModalUseGadgetDirection;
