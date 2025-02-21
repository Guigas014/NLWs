package com.nlw.events.repository;

import org.springframework.data.repository.CrudRepository;

import com.nlw.events.model.Event;
import com.nlw.events.model.Subscription;
import com.nlw.events.model.User;

public interface SubscriptionRepository extends CrudRepository<Subscription, Integer> {

      public Subscription findByEventAndSubscriber(Event event, User user);

}
