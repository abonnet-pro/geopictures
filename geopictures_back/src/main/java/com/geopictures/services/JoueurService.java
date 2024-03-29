package com.geopictures.services;

import com.geopictures.models.entities.Avatar;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.PhotoJoueur;
import com.geopictures.models.entities.Utilisateur;
import com.geopictures.repositories.AvatarRepository;
import com.geopictures.repositories.JoueurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class JoueurService {

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private AvatarRepository avatarRepository;

    private final int EXPERIENCE_BONUS_SUCCES_GPS = 50;
    private final double MULTIPLICATEUR_PROCHAIN_NIVEAU = 1.2;

    public Joueur initJoueur(Utilisateur utilisateur, Avatar avatar) {
        return Joueur.builder()
                .utilisateur(utilisateur)
                .niveau(1)
                .experience(0)
                .prochainNiveau(100)
                .pointsBoutique(0)
                .avatarActif(avatar)
                .build();
    }

    public Joueur updateJoueurInformations(PhotoJoueur photoJoueur, Joueur joueur) {
        int experienceGagne = photoJoueur.getSuccesGps() ? EXPERIENCE_BONUS_SUCCES_GPS + photoJoueur.getScore().intValue() : photoJoueur.getScore().intValue();
        joueur.setExperience(joueur.getExperience() + experienceGagne);
        joueur.setPointsBoutique(joueur.getPointsBoutique() + experienceGagne);

        joueur = checkPassageNiveau(joueur);

        return joueurRepository.save(joueur);
    }

    private Joueur checkPassageNiveau(Joueur joueur) {
        if(joueur.getExperience() >= joueur.getProchainNiveau()) {
            joueur.setNiveau(joueur.getNiveau() + 1);
            joueur.setExperience(joueur.getExperience() - joueur.getProchainNiveau());
            joueur.setProchainNiveau((int) (joueur.getProchainNiveau() * MULTIPLICATEUR_PROCHAIN_NIVEAU));

            List<Avatar> avatars = avatarRepository.findAllByFree(false);
            Optional<Avatar> avatar = avatars.stream().filter(av -> !joueur.getAvatars().contains(av)).findFirst();
            avatar.ifPresent(value -> joueur.getAvatars().add(value));
        }

        return joueur;
    }
}
