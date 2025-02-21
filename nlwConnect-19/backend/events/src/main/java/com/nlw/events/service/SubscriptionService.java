package com.nlw.events.service;

import org.springframework.stereotype.Service;

import com.nlw.events.dto.SubscriptionResponseDTO;
import com.nlw.events.exception.EventNotFoundException;
import com.nlw.events.exception.SubscriptionConflictException;
import com.nlw.events.exception.UserIndicadorNotFoundException;
import com.nlw.events.model.Event;
import com.nlw.events.model.Subscription;
import com.nlw.events.model.User;
import com.nlw.events.repository.EventRepository;
import com.nlw.events.repository.SubscriptionRepository;
import com.nlw.events.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

      private final SubscriptionRepository subscriptionRepository;
      private final UserRepository userRepository;
      private final EventRepository eventRepository;

      public SubscriptionResponseDTO createNewSubscription(String eventName, User user, Integer userId) {
            // Recupera o evento pelo nome
            Event event = eventRepository.findByPrettyName(eventName);
            if (event == null) {
                  throw new EventNotFoundException("Evento " + eventName + " não existe!");
            }

            // Testa se o user já existe no DB
            User userExist = userRepository.findByEmail(user.getEmail());

            if (userExist == null) {
                  // Salva o user no db e salva na própia variável.
                  userExist = userRepository.save(user);
            }

            // Testa se o usuário que indicou existe
            User indicador = userRepository.findById(userId).orElse(null);
            if (indicador == null) {
                  throw new UserIndicadorNotFoundException("Usuário indicador não existe!");
            }

            Subscription subscription = new Subscription();
            subscription.setEvent(event);
            subscription.setSubscriber(userExist);
            subscription.setIndication(indicador);

            Subscription newSubscription = subscriptionRepository.findByEventAndSubscriber(event, userExist);
            if (newSubscription != null) {
                  throw new SubscriptionConflictException(
                              "Já existe uma inscrição para o usuário "
                                          + userExist.getName() +
                                          " no evento " + event.getTitle() + "!");
            }

            // Salva a inscrição.
            Subscription response = subscriptionRepository.save(subscription);

            // Cria o objeto de saída
            var designation = "http://codecraft.com/subscription/" + response.getEvent().getPrettyName() +
                        "/" + response.getSubscriber().getUserId();

            SubscriptionResponseDTO newResponse = new SubscriptionResponseDTO(
                        response.getSubscriptionNumber(), designation);

            return newResponse;
      }
}
