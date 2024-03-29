import {StyleSheet, View} from "react-native";
import * as React from "react";
import {Text} from "@rneui/base";
import Picker from '@ouroboros/react-native-picker';
import {Region, RegionLibelle} from "../../../commons/enums/regions.enum";

export default function ClassementFiltre({ zoneSelected, handleZoneSelected, selectedRegion, handleRegionSelected, zonesOptions }) {

    return(
        <View style={style.pickersContainer}>
            <View style={ style.pickerContainer}>
                <Picker
                    onChanged={handleRegionSelected}
                    options={[
                        {text: "Toutes", value: "TOUTES"},
                        {text: RegionLibelle(Region.HAUT_DE_FRANCE), value: Region.HAUT_DE_FRANCE},
                        {text: RegionLibelle(Region.GRAND_EST), value: Region.GRAND_EST},
                        {text: RegionLibelle(Region.ILE_DE_FRANCE), value: Region.ILE_DE_FRANCE},
                        {text: RegionLibelle(Region.NORMANDIE), value: Region.NORMANDIE},
                        {text: RegionLibelle(Region.BRETAGNE), value: Region.BRETAGNE},
                        {text: RegionLibelle(Region.PAYS_DE_LA_LOIRE), value: Region.PAYS_DE_LA_LOIRE},
                        {text: RegionLibelle(Region.CENTRE_VAL_DE_LOIRE), value: Region.CENTRE_VAL_DE_LOIRE},
                        {text: RegionLibelle(Region.BOURGOGNE_FRANCHE_COMTE), value: Region.BOURGOGNE_FRANCHE_COMTE},
                        {text: RegionLibelle(Region.AUVERGNE_RHONE_ALPES), value: Region.AUVERGNE_RHONE_ALPES},
                        {text: RegionLibelle(Region.NOUVELLE_AQUITAINE), value: Region.NOUVELLE_AQUITAINE},
                        {text: RegionLibelle(Region.OCCITANIE), value: Region.OCCITANIE},
                        {text: RegionLibelle(Region.PROVENCE_ALPE_COTE_AZUR), value: Region.PROVENCE_ALPE_COTE_AZUR},
                        {text: RegionLibelle(Region.CORSE), value: Region.CORSE},
                    ]}
                    style={{padding: 5}}
                    value={selectedRegion}
                />
            </View>

                {
                    zonesOptions && zonesOptions.length > 1 &&
                        <View style={ style.pickerContainer}>
                            <Picker
                                onChanged={handleZoneSelected}
                                options={zonesOptions}
                                style={{padding: 5}}
                                value={zoneSelected}
                            />
                        </View>
                }
        </View>
    )
}

const style = StyleSheet.create({
    pickerContainer: {
        marginRight:10,
        marginTop: 5,
        marginLeft: 5,
        width: 100,
        paddingLeft:5,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 20
    },
    pickersContainer : {
        flexDirection : "row"
    }
});