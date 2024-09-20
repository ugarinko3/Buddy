package com.camp.Buddy.service;

import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private FirebaseStorageService firebaseStorageService;

    public void createUser(User user) {
        Optional<User> existingUser = userRepository.findByLogin(user.getLogin());
        if (existingUser.isPresent()) {
            return;
        }
        user.setUrlAvatar(firebaseStorageService.getPhotoUrl(user.getLogin()));
        userRepository.save(user);
    }

    public String getAvatarUrlByLogin(String login) {
        return userRepository.findByLogin(login)
                .map(User::getUrlAvatar) // Предполагается, что у вас есть метод getUrlAvatar в классе User
                .orElse(null); // Или выбросьте исключение, если пользователь не найден
    }

//    public List<String> getTeam(String login) {
//        try {
//            DocumentSnapshot document = userRepository.findById(login);
//            if (document.exists()) {
//                Optional<Map<String, Object>> optionalTeam = Optional.ofNullable((Map<String, Object>) document.get("team"));
//                return optionalTeam.map(stringObjectMap -> new ArrayList<>(stringObjectMap.keySet())).orElseGet(ArrayList::new);
//            } else {
//                throw new RuntimeException("Пользователь не найден");
//            }
//        } catch (InterruptedException | ExecutionException e) {
//            throw new RuntimeException("Ошибка при получении данных: " + e.getMessage(), e);
//        }
//    }

    public String getUserRole(String login) {
        Optional<User> userOptional = userRepository.findByLogin(login);

        if (userOptional.isPresent()) {
            return userOptional.get().getRole(); // Предполагается, что у вас есть метод getRole в классе User
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }

    private List<String> getUserLikes(String login) {
        Optional<User> userOptional = userRepository.findByLogin(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<String> stringList = user.getLikePost();
            return stringList != null ? stringList : new ArrayList<>();
        }
        return new ArrayList<>();
    }

    public void getLike(UUID id, String login) {
        List<String> stringList = getUserLikes(login);
        String idString = id.toString();

        if (stringList.contains(idString)) {
            stringList.remove(idString);
        } else {
            stringList.add(idString);
        }

        // Сохраняем обновленный список лайков
        Optional<User> userOptional = userRepository.findByLogin(login);
        userOptional.ifPresent(user -> {
            user.setLikePost(stringList);
            userRepository.save(user);
        });
    }

    public boolean checkLikePost(UUID id, String login) {
        List<String> stringList = getUserLikes(login);
        String idString = id.toString();
        return stringList.contains(idString);
    }


}
